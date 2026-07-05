const navItems = [
  { id: "today", label: "Today", icon: "T" },
  { id: "tasks", label: "Tasks", icon: "K" },
  { id: "calendar", label: "Calendar", icon: "C" },
  { id: "training", label: "Training", icon: "R" },
  { id: "pokemon", label: "Pokemon GO", icon: "P" },
  { id: "news", label: "News", icon: "Nw" },
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
  training: {
    title: "Sustainable base week",
    summary:
      "Keep the week boring on purpose: one quality run, one long run, two strength sessions, and easy work that does not steal from recovery.",
    metrics: [
      { value: "22", label: "target miles" },
      { value: "2", label: "strength days" },
      { value: "1", label: "quality run" },
    ],
    readiness: [
      {
        label: "Today",
        value: "Easy",
        detail: "Use conversational effort. If legs are flat, choose mobility without guilt.",
      },
      {
        label: "Watch",
        value: "Heat + schedule",
        detail: "Move the run earlier if weather or Pokemon event timing crowds the afternoon.",
      },
      {
        label: "Rule",
        value: "No hero reps",
        detail: "Leave every workout feeling like you could have done a little more.",
      },
    ],
  },
  workouts: [
    {
      title: "Today: easy run or mobility reset",
      meta: "25-40 min - RPE 3-4",
      tag: "Today",
      purpose: "Preserve the rhythm without borrowing energy from the weekend.",
      steps: ["3-4 easy miles at conversational effort", "Keep cadence relaxed; no pace target", "Finish with 5 minutes calves, hips, and hamstrings"],
      fallback: "If sleep, heat, or legs feel off: skip mileage and do 20 minutes mobility plus dead bugs, side planks, and glute bridges.",
      checklist: ["Shoes ready", "Hydrate before heading out", "Stop while it still feels easy"],
    },
    {
      title: "Upper strength / physique",
      meta: "45 min - push, pull, shoulders, arms",
      tag: "Strength",
      purpose: "Keep strength progress moving without loading legs before weekend running.",
      steps: ["DB press 3x8-10", "Chest-supported row 3x10", "Lateral raise 3x12-15", "Curl + triceps superset 2-3 rounds"],
      fallback: "If time is tight: press, row, lateral raise. Leave accessories for later.",
      checklist: ["2 reps in reserve", "No grinder sets", "Log top set"],
    },
    {
      title: "Saturday tempo",
      meta: "Warmup, 18-24 min steady, cooldown",
      tag: "Quality",
      purpose: "One controlled quality day keeps fitness sharp without crowding recovery.",
      steps: ["10 min warmup easy", "18-24 min steady tempo, not a race", "8-10 min cooldown", "Optional 4 relaxed strides if fresh"],
      fallback: "If heat or life timing interferes: 30-35 minutes easy with 6 x 20 second pickups.",
      checklist: ["Route picked", "Effort smooth", "Finish controlled"],
    },
    {
      title: "Sunday long run",
      meta: "6 miles easy",
      tag: "Long",
      purpose: "Preserve the aerobic base and keep the weekly rhythm simple.",
      steps: ["6 miles easy", "First mile deliberately slow", "Stay relaxed on hills", "Walk 2-3 minutes after finishing"],
      fallback: "If the week runs long: cap at 45 minutes and keep the streak alive.",
      checklist: ["Start easy", "Bring water if hot", "No fast finish needed"],
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
  news: [
    {
      title: "AI, startups, personal tech, and useful internet shifts",
      source: "Ben HQ relevance model",
      summary:
        "The news surface should answer: what changed, why Ben might care, and whether it deserves attention today.",
      tags: ["AI", "Startups", "Tools", "YouTube"],
    },
    {
      title: "Avoid infinite-scroll news",
      source: "Personal product rule",
      summary:
        "Default to a short briefing. Show enough context to decide, then link out only when the story is worth a deeper read.",
      tags: ["Signal", "Focus"],
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
      title: "Current news",
      status: "Live public",
      tone: "news",
      icon: "Nw",
      source: "TechCrunch, VentureBeat, BBC via GDELT, Hacker News, YouTube links",
      summary: "A public-source briefing for AI, startups, useful personal tech, platforms, gaming, and internet shifts worth noticing.",
      next: "Add saved interests and YouTube channel feeds once Ben HQ has a stronger personal profile.",
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
  privateDaily: "ben-hq-private-daily-v1",
  bridgeSettings: "ben-hq-bridge-settings-v1",
  autoSync: "ben-hq-auto-sync-v1",
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
let privateDaily = loadPrivateDaily();
let bridgeSettings = loadBridgeSettings();
let autoSyncSettings = loadAutoSyncSettings();
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
  raids: "--",
  activeEvents: [],
  featuredEvent: null,
  sourceNote: "Loading public event feeds...",
  updated: "",
};
let newsState = {
  status: "loading",
  updated: "",
  overview: "Loading a focused public news briefing...",
  items: [],
  sources: [],
  sourceNote: "Checking TechCrunch, VentureBeat, BBC, Hacker News, and YouTube radar.",
};
let sourceHealthState = {
  weather: "loading",
  pokemon: "loading",
  news: "loading",
  lichess: "loading",
  private: hasPrivateDailyData(privateDaily) ? "live" : "offline",
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

const starterDailyPacket = {
  app: "Ben HQ",
  kind: "daily-packet",
  generatedAt: new Date().toISOString(),
  summary:
    "Starter private packet loaded. Use this as the shape for Gmail, Calendar, Drive, Notes, Garmin, Apple Health, and ChatGPT summaries.",
  sources: [
    { name: "Google Calendar", status: "starter", detail: "Replace with personal calendar bridge" },
    { name: "Gmail", status: "starter", detail: "Replace with personal inbox summary" },
    { name: "Apple Health / Garmin", status: "starter", detail: "Replace with iPhone Shortcut packet" },
  ],
  agenda: [
    {
      time: "Morning",
      title: "Check private pulse",
      detail: "Review calendar anchors, reply-needed mail, and training readiness before adding new tasks.",
      source: "Starter packet",
      tone: "ai",
    },
  ],
  calendar: {
    events: [
      {
        time: "2:00 PM-5:00 PM",
        title: "Pokemon GO event window",
        detail: "Use this as an example of how personal calendar events appear on Today.",
        source: "Starter packet",
        tone: "pokemon",
      },
    ],
  },
  gmail: {
    highlights: [
      {
        title: "Example inbox highlight",
        detail: "Summaries can show the sender and why it matters without exposing full email bodies.",
        meta: "Today",
        source: "Starter Gmail",
      },
    ],
    needsReply: [
      {
        title: "Example reply-needed loop",
        detail: "A short response would close this personal loop.",
        meta: "Today",
        source: "Starter Gmail",
      },
    ],
  },
  drive: {
    recent: [
      {
        title: "Example planning doc",
        detail: "Recently modified personal file metadata can surface here.",
        source: "Starter Drive",
      },
    ],
  },
  notes: {
    items: [
      {
        title: "Example iPhone note",
        detail: "Notes can become reviewable memory cards after import.",
        source: "Starter Notes",
      },
    ],
  },
  health: {
    sleepHours: "7.0",
    steps: "3,200",
    readiness: "Normal",
    readinessNote: "Keep the workout easy unless fatigue or heat says otherwise.",
  },
  training: {
    recommendedWorkout: {
      title: "Easy run or mobility reset",
      detail: "Use imported health and schedule context to pick the sensible version.",
      duration: "25-40 min",
      fallback: "20 min mobility",
    },
    lastWorkout: "Starter import",
    rule: "Protect tomorrow",
  },
  recommendations: [
    {
      title: "Set up one real source next",
      detail: "Copy the Google script, deploy it, then paste the Web App URL into Ben HQ.",
      source: "Starter packet",
    },
  ],
};

const googleBridgeScriptTemplate = `const BEN_HQ_VERSION = "2026-07-04-bridge-helper-1";

function doGet(event) {
  const configuredKey = PropertiesService.getScriptProperties().getProperty("BEN_HQ_PASSCODE");
  const providedKey = event && event.parameter ? event.parameter.key : "";
  if (configuredKey && providedKey !== configuredKey) {
    return jsonOutput({ app: "Ben HQ", error: "Unauthorized" });
  }
  return jsonOutput(buildBenHqDailyPacket());
}

function buildBenHqDailyPacket() {
  const now = new Date();
  return {
    app: "Ben HQ",
    kind: "daily-packet",
    version: BEN_HQ_VERSION,
    generatedAt: now.toISOString(),
    summary: "Personal bridge synced Gmail, Calendar, and Drive metadata for today's planning surface.",
    sources: [
      { name: "Google Calendar", status: "synced", detail: "Default personal calendar, today only" },
      { name: "Gmail", status: "synced", detail: "Recent inbox thread metadata only" },
      { name: "Google Drive", status: "synced", detail: "Recently modified file metadata only" }
    ],
    calendar: { events: getTodayCalendarEvents(now) },
    gmail: { highlights: getInboxHighlights(), needsReply: getLikelyReplyThreads() },
    drive: { recent: getRecentDriveFiles(now) },
    recommendations: [
      {
        title: "Scan the private pulse first",
        detail: "Review calendar anchors and reply-needed mail before adding new tasks.",
        source: "Ben HQ bridge"
      }
    ]
  };
}

function getTodayCalendarEvents(now) {
  return CalendarApp.getDefaultCalendar().getEventsForDay(now).slice(0, 8).map(function (event) {
    return {
      time: formatTimeWindow(event.getStartTime(), event.getEndTime()),
      title: event.getTitle(),
      detail: event.getLocation() || "Calendar event",
      source: "Google Calendar",
      tone: "calendar"
    };
  });
}

function getInboxHighlights() {
  return GmailApp.search("in:inbox newer_than:3d -category:promotions", 0, 8).map(function (thread) {
    const message = thread.getMessages()[thread.getMessageCount() - 1];
    return {
      title: thread.getFirstMessageSubject() || "Inbox thread",
      detail: "From " + cleanSender(message.getFrom()),
      meta: Utilities.formatDate(message.getDate(), Session.getScriptTimeZone(), "EEE h:mm a"),
      source: "Gmail"
    };
  });
}

function getLikelyReplyThreads() {
  return GmailApp.search("in:inbox newer_than:7d -from:me", 0, 5).map(function (thread) {
    const message = thread.getMessages()[thread.getMessageCount() - 1];
    return {
      title: thread.getFirstMessageSubject() || "Possible reply",
      detail: "Consider whether this needs a response from " + cleanSender(message.getFrom()),
      meta: Utilities.formatDate(message.getDate(), Session.getScriptTimeZone(), "EEE h:mm a"),
      source: "Gmail"
    };
  });
}

function getRecentDriveFiles(now) {
  const cutoff = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7);
  const cutoffText = Utilities.formatDate(cutoff, "GMT", "yyyy-MM-dd'T'HH:mm:ss");
  const files = DriveApp.searchFiles('modifiedDate > "' + cutoffText + '" and trashed = false');
  const results = [];
  while (files.hasNext() && results.length < 8) {
    const file = files.next();
    results.push({
      title: file.getName(),
      detail: "Modified " + Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), "MMM d h:mm a"),
      source: "Google Drive"
    });
  }
  return results;
}

function cleanSender(value) {
  return String(value || "").replace(/<[^>]+>/g, "").replace(/"/g, "").trim();
}

function formatTimeWindow(start, end) {
  const zone = Session.getScriptTimeZone();
  return Utilities.formatDate(start, zone, "h:mm a") + "-" + Utilities.formatDate(end, zone, "h:mm a");
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload, null, 2)).setMimeType(ContentService.MimeType.JSON);
}`;

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
    name: "PoGoAPI + PogoInfo",
    endpoints: {
      released: "https://pogoapi.net/api/v1/released_pokemon.json",
      shiny: "https://pogoapi.net/api/v1/shiny_pokemon.json",
      nesting: "https://pogoapi.net/api/v1/nesting_pokemon.json",
      raids: "https://raw.githubusercontent.com/ccev/pogoinfo/v2/active/raids.json",
      events: "https://raw.githubusercontent.com/ccev/pogoinfo/v2/active/events.json",
    },
    async fetch() {
      const [released, shiny, nesting, raids, events] = await Promise.all(
        [this.endpoints.released, this.endpoints.shiny, this.endpoints.nesting, this.endpoints.raids, this.endpoints.events].map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Pokemon GO public data request failed: ${response.status}`);
          }
          return response.json();
        }),
      );
      return { released, shiny, nesting, raids, events };
    },
  },
  news: {
    name: "Public news feeds",
    endpoints: {
      techcrunch: "https://techcrunch.com/wp-json/wp/v2/posts?per_page=10&_embed=1",
      venturebeat: "https://venturebeat.com/wp-json/wp/v2/posts?per_page=10&_embed=1",
      hackerNews: "https://hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&hitsPerPage=20",
      bbc:
        "https://api.gdeltproject.org/api/v2/doc/doc?query=domain:bbc.com%20technology&mode=artlist&format=json&maxrecords=10&sort=hybridrel",
    },
    async fetch() {
      const fetchJson = async (name, url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);
        const response = await fetch(url, { headers: { Accept: "application/json" }, signal: controller.signal }).finally(() => clearTimeout(timeoutId));
        if (!response.ok) {
          throw new Error(`${name} request failed: ${response.status}`);
        }
        return response.json();
      };
      const entries = Object.entries(this.endpoints);
      const settled = await Promise.allSettled(entries.map(([name, url]) => fetchJson(name, url)));
      return entries.map(([name], index) => ({
        name,
        status: settled[index].status,
        value: settled[index].status === "fulfilled" ? settled[index].value : null,
        error: settled[index].status === "rejected" ? settled[index].reason?.message || "Unavailable" : "",
      }));
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

function emptyPrivateDaily() {
  return {
    status: "empty",
    generatedAt: "",
    importedAt: "",
    summary: "",
    sources: [],
    agenda: [],
    calendarEvents: [],
    mail: { highlights: [], needsReply: [] },
    drive: { items: [] },
    notes: { items: [] },
    health: {},
    training: {},
    recommendations: [],
  };
}

function loadPrivateDaily() {
  return normalizePrivateDailyPacket(readJson(storageKeys.privateDaily, null), "stored");
}

function loadBridgeSettings() {
  const stored = readJson(storageKeys.bridgeSettings, {});
  return {
    url: typeof stored.url === "string" ? stored.url : "",
    passcode: typeof stored.passcode === "string" ? stored.passcode : "",
    lastSyncAt: typeof stored.lastSyncAt === "string" ? stored.lastSyncAt : "",
    status: typeof stored.status === "string" ? stored.status : "not configured",
    error: typeof stored.error === "string" ? stored.error : "",
  };
}

function loadAutoSyncSettings() {
  const stored = readJson(storageKeys.autoSync, {});
  return {
    key: typeof stored.key === "string" ? stored.key : "",
    lastSyncAt: typeof stored.lastSyncAt === "string" ? stored.lastSyncAt : "",
    status: typeof stored.status === "string" ? stored.status : "not configured",
    error: typeof stored.error === "string" ? stored.error : "",
  };
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

function savePrivateDaily() {
  writeJson(storageKeys.privateDaily, privateDaily);
}

function saveBridgeSettings() {
  writeJson(storageKeys.bridgeSettings, bridgeSettings);
}

function saveAutoSyncSettings() {
  writeJson(storageKeys.autoSync, autoSyncSettings);
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

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

function compactText(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function firstText(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}

function formatInteger(value, fallback = "--") {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : fallback;
}

function decodeHtml(value) {
  const text = String(value || "");
  if (!text) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function stripHtml(value) {
  return decodeHtml(String(value || "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function toTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function relativeTime(value) {
  const time = toTime(value);
  if (!time) return "recent";
  const diffMinutes = Math.max(1, Math.round((Date.now() - time) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 48) return `${diffHours}h ago`;
  return new Date(time).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function parseCompactNewsDate(value) {
  const text = String(value || "");
  const match = text.match(/^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?/);
  if (!match) return value;
  const [, year, month, day, hour = "00", minute = "00", second = "00"] = match;
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

function compactSentence(value, maxLength = 170) {
  const text = stripHtml(value);
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength - 1);
  const sentenceEnd = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("!"), clipped.lastIndexOf("?"));
  const safeEnd = sentenceEnd > 80 ? sentenceEnd + 1 : clipped.lastIndexOf(" ");
  return `${clipped.slice(0, safeEnd > 60 ? safeEnd : maxLength - 1).trim()}...`;
}

function normalizeSourceList(value) {
  return asArray(value)
    .map((item) => {
      if (typeof item === "string") return { name: item, status: "synced" };
      if (!item || typeof item !== "object") return null;
      const name = compactText(item.name || item.title || item.source);
      if (!name) return null;
      return {
        name,
        status: compactText(item.status || item.state, "synced"),
        detail: compactText(item.detail || item.summary || item.freshness),
      };
    })
    .filter(Boolean);
}

function normalizeAgendaItem(item, source = "Private bridge") {
  if (!item || typeof item !== "object") return null;
  const title = compactText(item.title || item.summary || item.name);
  if (!title) return null;
  return {
    time: compactText(item.time || item.when || item.start || item.window, "Today"),
    title,
    detail: compactText(item.detail || item.description || item.body || item.location, ""),
    tone: compactText(item.tone || item.type, "calendar"),
    source: compactText(item.source, source),
  };
}

function normalizeTextItem(item, fallbackTitle = "Private item") {
  if (typeof item === "string") {
    return { title: item, detail: "", source: "Private bridge" };
  }
  if (!item || typeof item !== "object") return null;
  const title = compactText(item.title || item.subject || item.name || item.summary, fallbackTitle);
  const detail = compactText(item.detail || item.body || item.snippet || item.description || item.reason, "");
  return {
    title,
    detail,
    source: compactText(item.source || item.from || item.app, "Private bridge"),
    meta: compactText(item.meta || item.when || item.date || item.status, ""),
  };
}

function normalizePrivateDailyPacket(payload, origin = "import") {
  if (!payload || typeof payload !== "object") return emptyPrivateDaily();
  const data = payload.daily || payload.packet || payload;
  const mail = data.gmail || data.mail || {};
  const drive = data.drive || {};
  const notes = data.notes || {};
  const health = data.health || data.appleHealth || data.fitness || {};
  const training = data.training || data.garmin || {};
  const generatedAt = compactText(data.generatedAt || data.updatedAt || data.date, "");
  const importedAt = compactText(data.importedAt, new Date().toISOString());

  const agenda = asArray(data.agenda).map((item) => normalizeAgendaItem(item, "Daily packet")).filter(Boolean);
  const calendarEvents = asArray(data.calendar?.events || data.calendarEvents || data.events)
    .map((item) => normalizeAgendaItem(item, "Calendar"))
    .filter(Boolean);
  const highlights = asArray(mail.highlights || mail.items || mail.summaries)
    .map((item) => normalizeTextItem(item, "Inbox highlight"))
    .filter(Boolean);
  const needsReply = asArray(mail.needsReply || mail.actions || mail.replyNeeded)
    .map((item) => normalizeTextItem(item, "Needs reply"))
    .filter(Boolean);
  const driveItems = asArray(drive.items || drive.recent || drive.files)
    .map((item) => normalizeTextItem(item, "Drive item"))
    .filter(Boolean);
  const noteItems = asArray(notes.items || notes.recent || notes)
    .map((item) => normalizeTextItem(item, "Note"))
    .filter(Boolean);
  const recommendations = asArray(data.recommendations || data.suggestions || data.actions)
    .map((item) => normalizeTextItem(item, "Recommendation"))
    .filter(Boolean);
  const sources = normalizeSourceList(data.sources);

  const normalized = {
    status: origin === "stored" ? compactText(data.status, "stored") : "live",
    generatedAt,
    importedAt,
    summary: compactText(data.summary || data.brief || data.dailyBrief, ""),
    sources,
    agenda,
    calendarEvents,
    mail: { highlights, needsReply },
    drive: { items: driveItems },
    notes: { items: noteItems },
    health: typeof health === "object" && health ? health : {},
    training: typeof training === "object" && training ? training : {},
    recommendations,
  };

  return hasPrivateDailyData(normalized) ? normalized : emptyPrivateDaily();
}

function hasPrivateDailyData(packet = privateDaily) {
  if (!packet || typeof packet !== "object") return false;
  return Boolean(
    compactText(packet.summary) ||
      asArray(packet.sources).length ||
      asArray(packet.agenda).length ||
      asArray(packet.calendarEvents).length ||
      asArray(packet.mail?.highlights).length ||
      asArray(packet.mail?.needsReply).length ||
      asArray(packet.drive?.items).length ||
      asArray(packet.notes?.items).length ||
      asArray(packet.recommendations).length ||
      Object.keys(packet.health || {}).length ||
      Object.keys(packet.training || {}).length,
  );
}

function privateDailyFreshness() {
  if (!hasPrivateDailyData()) return "No private packet yet";
  const date = new Date(privateDaily.generatedAt || privateDaily.importedAt);
  if (Number.isNaN(date.getTime())) return "Private packet loaded";
  return `Synced ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

function parseLocalEventDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const text = String(value).trim();
  const normalized = text.includes("T") ? text : text.replace(" ", "T");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatEventWindow(start, end) {
  const startDate = parseLocalEventDate(start);
  const endDate = parseLocalEventDate(end);
  if (!startDate && !endDate) return "Timing TBD";
  const dateOptions = { month: "short", day: "numeric" };
  const timeOptions = { hour: "numeric", minute: "2-digit" };
  if (startDate && endDate && startDate.toDateString() === endDate.toDateString()) {
    return `${startDate.toLocaleDateString(undefined, dateOptions)} ${startDate.toLocaleTimeString([], timeOptions)}-${endDate.toLocaleTimeString([], timeOptions)}`;
  }
  if (startDate && endDate) {
    return `${startDate.toLocaleDateString(undefined, dateOptions)}-${endDate.toLocaleDateString(undefined, dateOptions)}`;
  }
  return (startDate || endDate).toLocaleDateString(undefined, dateOptions);
}

function pokemonNameFromTemplate(value) {
  if (!value) return "";
  return String(value)
    .replace(/_NORMAL$/i, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function describePokemonList(list, fallback = "") {
  const names = asArray(list)
    .map((item) => firstText(item.name, item.pokemon_name, pokemonNameFromTemplate(item.template), item.text))
    .filter(Boolean);
  return names.length ? names.slice(0, 5).join(", ") : fallback;
}

function eventBonuses(event) {
  return asArray(event?.bonuses || event?.bonus)
    .map((bonus) => compactText(bonus.text || bonus.name || bonus.summary))
    .filter(Boolean)
    .slice(0, 4);
}

function fallbackPokemonEvents(today = new Date()) {
  const events = [
    {
      name: "Sobble Community Day",
      type: "community-day",
      start: "2026-07-04 14:00",
      end: "2026-07-04 17:00",
      source: "Curated event fallback",
      spawns: [{ name: "Sobble" }],
      shinies: [{ name: "Sobble" }],
      bonuses: [
        { text: "2x Catch Candy" },
        { text: "1/4 Hatch Distance" },
        { text: "Evolve Drizzile for Hydro Cannon Inteleon" },
      ],
      actions: ["Clear 80+ storage", "Mega Evolve a Water type", "Evolve best Drizzile before the move window closes"],
    },
    {
      name: "10th Anniversary Party",
      type: "event",
      start: "2026-07-04 10:00",
      end: "2026-07-06 20:00",
      source: "Curated event fallback",
      bonuses: [{ text: "Check event research" }, { text: "Use as a light bonus layer" }],
      actions: ["Check event research once", "Claim easy rewards", "Keep one family-friendly play window"],
    },
  ];
  return events.filter((event) => isPokemonEventRelevant(event, today));
}

function normalizePokemonEvent(event, today = new Date()) {
  if (!event || typeof event !== "object") return null;
  const title = compactText(event.name || event.title);
  if (!title) return null;
  const startDate = parseLocalEventDate(event.start || event.start_time || event.date);
  const endDate = parseLocalEventDate(event.end || event.end_time);
  const bonuses = eventBonuses(event);
  const spawns = describePokemonList(event.spawns || event.featured_pokemon);
  const raids = describePokemonList(event.raids);
  const shiny = describePokemonList(event.shinies);
  const actions = asArray(event.actions).map((action) => compactText(action)).filter(Boolean);

  return {
    title,
    type: compactText(event.type, "event"),
    start: startDate,
    end: endDate,
    window: formatEventWindow(startDate, endDate),
    source: compactText(event.source, "PogoInfo public JSON"),
    summary: [spawns && `Spawns: ${spawns}`, raids && `Raids: ${raids}`, shiny && `Shiny checks: ${shiny}`, bonuses[0]].filter(Boolean).join(". "),
    bonuses,
    actions,
    isActive: startDate && endDate ? startDate <= today && endDate >= today : false,
  };
}

function isPokemonEventRelevant(event, today = new Date()) {
  const start = parseLocalEventDate(event.start || event.start_time || event.date);
  const end = parseLocalEventDate(event.end || event.end_time);
  if (!start && !end) return false;
  const startWindow = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 7);
  const endWindow = new Date(today.getTime() - 1000 * 60 * 60 * 24);
  return (!end || end >= endWindow) && (!start || start <= startWindow);
}

function normalizePokemonEvents(events, today = new Date()) {
  return asArray(events)
    .filter((event) => isPokemonEventRelevant(event, today))
    .map((event) => normalizePokemonEvent(event, today))
    .filter(Boolean)
    .sort(sortPokemonEvents);
}

function sortPokemonEvents(a, b) {
  if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
  return (a.start?.getTime() || 0) - (b.start?.getTime() || 0);
}

function currentPokemonEvents() {
  const events = pokemonLiveState.activeEvents.length ? pokemonLiveState.activeEvents : fallbackPokemonEvents().map((event) => normalizePokemonEvent(event)).filter(Boolean);
  return [...events].sort(sortPokemonEvents);
}

const newsInterestRules = [
  { tag: "AI", score: 9, pattern: /\b(ai|artificial intelligence|openai|chatgpt|claude|gemini|llm|agent|model|codex)\b/i },
  { tag: "Startups", score: 7, pattern: /\b(startup|founder|funding|venture|vc|seed|series [abc]|unicorn|acquire|ipo)\b/i },
  { tag: "Personal tech", score: 6, pattern: /\b(apple|iphone|ios|android|google|chrome|mac|windows|device|app|wearable|garmin)\b/i },
  { tag: "Productivity", score: 6, pattern: /\b(productivity|workflow|automation|calendar|notes|email|gmail|tool|desk|browser)\b/i },
  { tag: "YouTube", score: 5, pattern: /\b(youtube|creator|video|streaming|shorts)\b/i },
  { tag: "Gaming", score: 5, pattern: /\b(game|gaming|pokemon|nintendo|xbox|playstation|steam|chess|lichess)\b/i },
  { tag: "Health tech", score: 4, pattern: /\b(health|fitness|running|sleep|heart rate|wearable|strava|garmin)\b/i },
  { tag: "Security", score: 4, pattern: /\b(security|privacy|hack|breach|password|scam|malware|ransomware)\b/i },
];

const youtubeRadarLinks = [
  {
    title: "AI tools and personal workflow",
    url: "https://www.youtube.com/results?search_query=AI+tools+productivity+workflow&sp=CAISAhAB",
    detail: "Sorted toward recent uploads. Useful for spotting tools that may be worth testing in Ben HQ.",
  },
  {
    title: "Startup and tech analysis",
    url: "https://www.youtube.com/results?search_query=startup+tech+news+AI&sp=CAISAhAB",
    detail: "Good for fast context when a story is more about momentum than the article headline shows.",
  },
  {
    title: "Chess improvement videos",
    url: "https://www.youtube.com/results?search_query=chess+puzzle+training+beginner+intermediate&sp=CAISAhAB",
    detail: "Short tactics and pattern videos for the chess module once channel preferences are known.",
  },
];

function newsTagsForText(text) {
  return newsInterestRules.filter((rule) => rule.pattern.test(text)).map((rule) => rule.tag);
}

function newsScoreForItem(item) {
  const haystack = `${item.title} ${item.summary} ${item.source}`.toLowerCase();
  const interestScore = newsInterestRules.reduce((sum, rule) => sum + (rule.pattern.test(haystack) ? rule.score : 0), 0);
  const ageHours = item.publishedAt ? Math.max(0, (Date.now() - toTime(item.publishedAt)) / 3600000) : 24;
  const freshnessScore = Math.max(0, 9 - Math.floor(ageHours / 8));
  const socialScore = item.points ? Math.min(5, Math.floor(item.points / 80)) : 0;
  return interestScore + freshnessScore + socialScore;
}

function normalizeWordPressNews(posts, source) {
  return asArray(posts)
    .map((post) => {
      const title = stripHtml(post.title?.rendered || post.title);
      const summary = compactSentence(post.excerpt?.rendered || post.content?.rendered || "");
      const url = compactText(post.link || post.guid?.rendered);
      if (!title || !url) return null;
      return {
        id: `${source}:${url}`,
        title,
        summary,
        url,
        source,
        sourceKey: source.toLowerCase().replace(/\s+/g, "-"),
        publishedAt: post.date_gmt || post.date,
      };
    })
    .filter(Boolean);
}

function normalizeHackerNewsNews(payload) {
  return asArray(payload?.hits)
    .map((story) => {
      const title = stripHtml(story.title || story.story_title);
      const url = compactText(story.url || story.story_url || (story.objectID ? `https://news.ycombinator.com/item?id=${story.objectID}` : ""));
      if (!title || !url) return null;
      return {
        id: `Hacker News:${story.objectID || url}`,
        title,
        summary: story.points
          ? `${story.points} points on Hacker News. Use this as a tech-community pulse, not a definitive source.`
          : "Recent Hacker News discussion signal.",
        url,
        source: "Hacker News",
        sourceKey: "hacker-news",
        publishedAt: story.created_at,
        points: Number(story.points) || 0,
      };
    })
    .filter(Boolean);
}

function normalizeGdeltNews(payload) {
  return asArray(payload?.articles)
    .map((article) => {
      const title = stripHtml(article.title);
      const url = compactText(article.url);
      if (!title || !url) return null;
      return {
        id: `BBC:${url}`,
        title,
        summary: compactSentence(article.seendate ? `BBC-linked coverage seen ${article.seendate}.` : "BBC-linked technology coverage."),
        url,
        source: "BBC / GDELT",
        sourceKey: "bbc",
        publishedAt: parseCompactNewsDate(article.seendate),
      };
    })
    .filter(Boolean);
}

function normalizeNewsResults(results) {
  const items = [];
  const sources = [];
  for (const result of results) {
    const label =
      result.name === "techcrunch"
        ? "TechCrunch"
        : result.name === "venturebeat"
          ? "VentureBeat"
          : result.name === "hackerNews"
            ? "Hacker News"
            : "BBC / GDELT";
    const normalized =
      result.name === "hackerNews"
        ? normalizeHackerNewsNews(result.value)
        : result.name === "bbc"
          ? normalizeGdeltNews(result.value)
          : normalizeWordPressNews(result.value, label);
    sources.push({
      label,
      status: result.status === "fulfilled" && normalized.length ? "live" : "offline",
      count: normalized.length,
      error: result.error,
    });
    items.push(...normalized);
  }

  const seen = new Set();
  return {
    items: items
      .map((item) => {
        const tags = newsTagsForText(`${item.title} ${item.summary}`);
        return {
          ...item,
          tags: tags.length ? tags.slice(0, 3) : ["Tech"],
          score: newsScoreForItem({ ...item, tags }),
        };
      })
      .filter((item) => {
        if (seen.has(item.url)) return false;
        seen.add(item.url);
        return item.score >= 4;
      })
      .sort((a, b) => b.score - a.score || toTime(b.publishedAt) - toTime(a.publishedAt))
      .slice(0, 12),
    sources,
  };
}

function newsWhyItMatters(item) {
  const tags = item.tags || [];
  if (tags.includes("AI")) return "AI/tooling is one of Ben HQ's core interest lanes; this may affect workflows, apps, or how personal automation evolves.";
  if (tags.includes("Startups")) return "Startup movement is useful signal for where products, funding, and consumer tools may be heading next.";
  if (tags.includes("Personal tech")) return "This could matter for the devices and apps that shape day-to-day personal systems.";
  if (tags.includes("Security")) return "Security/privacy stories can become practical account, device, or family-tech actions.";
  if (tags.includes("Gaming")) return "Gaming stories are relevant when they touch Pokemon, chess, Nintendo, or family-friendly play.";
  return "Worth a quick scan if the headline connects to your current interests; otherwise safe to ignore.";
}

function buildNewsOverview(items = newsState.items) {
  if (!items.length) {
    return "No live news signal yet. Ben HQ will fill this with public-source stories when the feeds respond.";
  }
  const topTags = [...new Set(items.flatMap((item) => item.tags || []))].slice(0, 4);
  const topSources = [...new Set(items.slice(0, 6).map((item) => item.source))].slice(0, 3);
  const lead = items[0];
  return `${topTags.join(", ")} are the strongest live lanes right now. Lead story: ${lead.title}. Sources in play: ${topSources.join(", ")}.`;
}

function fallbackNewsItems() {
  const now = new Date().toISOString();
  return seed.news.map((item, index) => ({
    id: `fallback-news-${index}`,
    title: item.title,
    summary: item.summary,
    url: index === 0 ? "https://techcrunch.com/" : "https://www.youtube.com/results?search_query=AI+tools+productivity+workflow&sp=CAISAhAB",
    source: item.source,
    sourceKey: "fallback",
    publishedAt: now,
    tags: item.tags,
    score: 5,
  }));
}

function primaryPokemonEvent() {
  return currentPokemonEvents()[0] || normalizePokemonEvent(seed.pokemon[0]);
}

function pokemonActionPlan(event) {
  const directActions = asArray(event?.actions).map((action) => compactText(action)).filter(Boolean);
  if (directActions.length) return directActions.slice(0, 4);
  const title = `${event?.title || ""} ${event?.type || ""}`.toLowerCase();
  if (title.includes("community")) {
    return ["Clear storage before the window", "Mega Evolve a matching type", "Check shiny/high-IV candidates", "Evolve the best candidate during the move window"];
  }
  if (title.includes("raid")) {
    return ["Check whether the boss improves your teams", "Use free passes first", "Avoid impulse remote raids"];
  }
  return ["Check event research", "Claim easy rewards", "Set one short play window"];
}

function summarizePokemonEvent(event) {
  const bonuses = asArray(event?.bonuses).slice(0, 3);
  const summary = compactText(event?.summary);
  if (summary) return summary;
  if (bonuses.length) return bonuses.join(". ");
  return "Public event data is available, but details are limited. Keep the plan simple and source-labeled.";
}

function parseMetricNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const match = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function classifyReadiness(health = {}, training = {}) {
  const explicit = compactText(health.readiness || training.readiness || training.status);
  const sleep = parseMetricNumber(health.sleepHours || health.sleep || training.sleep);
  const stress = parseMetricNumber(health.stress || training.stress);
  const restingHr = parseMetricNumber(health.restingHr || health.restingHeartRate || training.restingHr);
  const load = parseMetricNumber(training.load || training.trainingLoad);

  if (/low|tired|poor|red|strained|sick/i.test(explicit)) return "Low";
  if (/high|green|ready|fresh|good/i.test(explicit)) return "Good";
  if (sleep !== null && sleep < 6) return "Low";
  if (stress !== null && stress >= 70) return "Low";
  if (load !== null && load >= 8) return "Caution";
  if (restingHr !== null && restingHr >= 70) return "Caution";
  return explicit || "Normal";
}

function buildTrainingIntelligence() {
  const training = privateDaily.training || {};
  const health = privateDaily.health || {};
  const readiness = classifyReadiness(health, training);
  const sleep = firstText(health.sleepHours, health.sleep, training.sleep, "--");
  const steps = firstText(health.steps, training.steps, "--");
  const lastWorkout = firstText(training.lastWorkout, health.lastWorkout, training.lastActivity, "No recent import");
  const source = hasPrivateDailyData() && (Object.keys(training).length || Object.keys(health).length) ? "Private health packet" : "Training rules";
  const recommended = training.recommendedWorkout || training.today || training.recommendation || {};
  const recommendedObject = typeof recommended === "object" && recommended ? recommended : { title: recommended };

  let title = compactText(recommendedObject.title, "Easy run or mobility reset");
  let detail = compactText(
    recommendedObject.detail || recommendedObject.summary || training.summary || health.readinessNote,
    "Keep the work useful but recoverable. The goal is consistency, not proving fitness today.",
  );
  let fallback = compactText(recommendedObject.fallback || training.fallback || health.recoveryNote, "20 minutes mobility and core");

  if (readiness === "Low") {
    title = "Mobility reset or very easy walk";
    detail = "Recovery signal is low. Preserve the habit, skip strain, and make tomorrow easier.";
    fallback = "Rest without guilt";
  } else if (readiness === "Caution") {
    title = compactText(recommendedObject.title, "Short easy run");
    detail = "Keep the planned work capped. No pace target, no fast finish, stop while it still feels easy.";
    fallback = "Cut volume by 30-50%";
  }

  return {
    readiness,
    sleep,
    steps,
    lastWorkout,
    source,
    title,
    detail,
    duration: firstText(recommendedObject.duration, training.duration, readiness === "Low" ? "10-25 min" : "25-40 min"),
    fallback,
    rules: [
      {
        label: "Readiness",
        value: readiness,
        detail: compactText(health.readinessNote || training.readinessNote, detail),
      },
      {
        label: "Last",
        value: lastWorkout,
        detail: compactText(training.lastWorkoutDetail || health.lastWorkoutDetail, "Use recent activity context before adding more load."),
      },
      {
        label: "Rule",
        value: readiness === "Good" ? "Build gently" : "Protect recovery",
        detail: fallback,
      },
    ],
  };
}

function decodePacketHashValue(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeBase64UrlBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function deriveAutoSyncCryptoKey(secret, saltBytes) {
  const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 120000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

async function deriveAutoSyncBits(secret, saltBytes, bits = 512) {
  const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 120000,
      hash: "SHA-256",
    },
    baseKey,
    bits,
  );
}

function concatBytes(...arrays) {
  const total = arrays.reduce((sum, array) => sum + array.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  arrays.forEach((array) => {
    output.set(array, offset);
    offset += array.length;
  });
  return output;
}

async function decryptAutoSyncEnvelope(envelope) {
  if (!envelope || !["AES-GCM-256-PBKDF2-SHA256", "AES-CBC-256-PBKDF2-HMACSHA256"].includes(envelope.algorithm)) {
    throw new Error("Unsupported encrypted packet");
  }
  const salt = decodeBase64UrlBytes(envelope.salt);
  const iv = decodeBase64UrlBytes(envelope.iv);
  const ciphertext = decodeBase64UrlBytes(envelope.ciphertext);

  if (envelope.algorithm === "AES-CBC-256-PBKDF2-HMACSHA256") {
    const expectedMac = decodeBase64UrlBytes(envelope.mac);
    const bits = new Uint8Array(await deriveAutoSyncBits(autoSyncSettings.key, salt));
    const encKeyBytes = bits.slice(0, 32);
    const macKeyBytes = bits.slice(32, 64);
    const macKey = await crypto.subtle.importKey("raw", macKeyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const verified = await crypto.subtle.verify("HMAC", macKey, expectedMac, concatBytes(iv, ciphertext));
    if (!verified) throw new Error("Encrypted packet signature mismatch");
    const encKey = await crypto.subtle.importKey("raw", encKeyBytes, "AES-CBC", false, ["decrypt"]);
    const plainBuffer = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, encKey, ciphertext);
    return JSON.parse(new TextDecoder().decode(plainBuffer));
  }

  const tag = decodeBase64UrlBytes(envelope.tag);
  const encrypted = concatBytes(ciphertext, tag);
  const key = await deriveAutoSyncCryptoKey(autoSyncSettings.key, salt);
  const plainBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
  return JSON.parse(new TextDecoder().decode(plainBuffer));
}

function importSyncKeyFromLocationHash() {
  const hash = window.location.hash ? window.location.hash.slice(1) : "";
  if (!hash) return false;
  const params = new URLSearchParams(hash);
  const syncKey = params.get("syncKey") || params.get("auto-sync-key");
  if (!syncKey) return false;
  autoSyncSettings = {
    ...autoSyncSettings,
    key: syncKey,
    status: "configured",
    error: "",
  };
  saveAutoSyncSettings();
  if (window.history?.replaceState) {
    window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
  }
  return true;
}

function importPacketFromLocationHash() {
  const hash = window.location.hash ? window.location.hash.slice(1) : "";
  if (!hash) return false;
  const params = new URLSearchParams(hash);
  const packetValue = params.get("packet") || params.get("ben-hq-packet");
  if (!packetValue) return false;

  try {
    const payload = JSON.parse(decodePacketHashValue(packetValue));
    const loaded = applyPrivateDailyPacket(payload, "link");
    if (loaded && window.history?.replaceState) {
      window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
    }
    return loaded;
  } catch (error) {
    alert("That Ben HQ packet link could not be read.");
    return false;
  }
}

function autoSyncPacketUrl() {
  return new URL("data/ben-hq-latest.enc.json", window.location.href).toString();
}

async function refreshEncryptedAutoSync() {
  if (!autoSyncSettings.key) {
    autoSyncSettings.status = "not configured";
    saveAutoSyncSettings();
    renderBridgePanel();
    return false;
  }

  sourceHealthState.private = "loading";
  autoSyncSettings.status = "checking";
  autoSyncSettings.error = "";
  saveAutoSyncSettings();
  renderBridgePanel();
  renderIntelligence();

  try {
    const response = await fetch(`${autoSyncPacketUrl()}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Encrypted packet request failed: ${response.status}`);
    const envelope = await response.json();
    const packet = await decryptAutoSyncEnvelope(envelope);
    if (!applyPrivateDailyPacket(packet, "auto")) throw new Error("Packet did not contain usable Ben HQ data");
    autoSyncSettings.status = "live";
    autoSyncSettings.lastSyncAt = new Date().toISOString();
    autoSyncSettings.error = "";
    saveAutoSyncSettings();
    renderBridgePanel();
    return true;
  } catch (error) {
    sourceHealthState.private = hasPrivateDailyData() ? "live" : "offline";
    autoSyncSettings.status = "error";
    autoSyncSettings.error = "Auto Sync could not decrypt the latest packet yet.";
    saveAutoSyncSettings();
    renderBridgePanel();
    renderIntelligence();
    return false;
  }
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

function messageTextFromChatGptNode(node) {
  const message = node?.message;
  if (!message || typeof message !== "object") return "";
  const content = message.content || {};
  const parts = asArray(content.parts)
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object") return compactText(part.text || part.content || part.value);
      return "";
    })
    .filter(Boolean);
  return parts.join("\n").trim();
}

function chatGptConversationMessages(conversation) {
  const nodes = Object.values(conversation?.mapping || {});
  return nodes
    .map((node) => ({
      role: node?.message?.author?.role || "",
      text: messageTextFromChatGptNode(node),
    }))
    .filter((item) => item.text && ["user", "assistant"].includes(item.role));
}

function classifyChatGptConversation(title, text) {
  const haystack = `${title} ${text}`.toLowerCase();
  const tags = [];
  if (/run|running|workout|strength|garmin|health|sleep|fitness/.test(haystack)) tags.push("training");
  if (/pokemon|community day|raid|go fest|sobble|inteleon/.test(haystack)) tags.push("pokemon");
  if (/task|todo|plan|schedule|routine|weekly|daily/.test(haystack)) tags.push("planning");
  if (/home|family|kid|birthday|weekend/.test(haystack)) tags.push("family");
  if (/prompt|chatgpt|ai|automation|workflow|codex/.test(haystack)) tags.push("ai workflow");
  if (/chess|lichess|puzzle|tactic/.test(haystack)) tags.push("chess");
  return tags.length ? tags.slice(0, 4) : ["personal context"];
}

function chatGptSuggestedAction(tags, title) {
  if (tags.includes("training")) return "Add this to training rules or today's readiness context.";
  if (tags.includes("pokemon")) return "Use this to update Pokemon GO event rules or family play planning.";
  if (tags.includes("planning")) return "Convert the clearest next step into a task.";
  if (tags.includes("family")) return "Save the useful part into the family activity bank.";
  if (tags.includes("ai workflow")) return "Promote the reusable pattern into the prompt or workflow library.";
  if (tags.includes("chess")) return "Keep the concept as a chess learning note.";
  return `Review whether "${title}" contains a reusable Ben preference or action.`;
}

function summarizeChatGptConversation(conversation) {
  if (!conversation || typeof conversation !== "object") return null;
  const title = compactText(conversation.title, "ChatGPT conversation");
  const messages = chatGptConversationMessages(conversation);
  if (!messages.length) return null;
  const userMessages = messages.filter((item) => item.role === "user").map((item) => item.text);
  const assistantMessages = messages.filter((item) => item.role === "assistant").map((item) => item.text);
  const lastUser = userMessages[userMessages.length - 1] || userMessages[0] || "";
  const lastAssistant = assistantMessages[assistantMessages.length - 1] || assistantMessages[0] || "";
  const combined = `${lastUser}\n${lastAssistant}`;
  const tags = classifyChatGptConversation(title, combined);
  const updatedAtSeconds = conversation.update_time || conversation.create_time;
  const createdAt = updatedAtSeconds ? new Date(updatedAtSeconds * 1000).toISOString() : new Date().toISOString();
  const body = [
    `Pattern: ${tags.join(", ")}`,
    `User context: ${contextPreview(lastUser)}`,
    lastAssistant ? `Useful answer: ${contextPreview(lastAssistant)}` : "",
    `Suggested action: ${chatGptSuggestedAction(tags, title)}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return normalizeContextImport({
    id: makeContextId(),
    source: "ChatGPT",
    title: `ChatGPT: ${title}`,
    body,
    status: "review",
    createdAt,
  });
}

function extractChatGptExportInsights(payload, fileName = "") {
  const conversations = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.conversations)
      ? payload.conversations
      : Array.isArray(payload?.items)
        ? payload.items
        : [];
  if (!conversations.length) return [];
  const looksLikeChatGpt =
    /conversations|chatgpt|openai/i.test(fileName) ||
    conversations.some((item) => item && typeof item === "object" && item.mapping && item.title);
  if (!looksLikeChatGpt) return [];
  return conversations
    .slice()
    .sort((a, b) => (b.update_time || b.create_time || 0) - (a.update_time || a.create_time || 0))
    .map(summarizeChatGptConversation)
    .filter(Boolean)
    .slice(0, 18);
}

function localDataSnapshot() {
  return {
    app: "Ben HQ",
    version: 1,
    exportedAt: new Date().toISOString(),
    captures: capturedItems,
    completedTasks: [...completedTasks],
    contextImports,
    privateDaily,
  };
}

function refreshLocalSurfaces() {
  renderTodayInsights();
  renderTasks();
  renderTodayAgenda();
  renderTodayWorkout();
  renderTodayPokemon();
  renderTodayNews();
  renderCalendar();
  renderTrainingOverview();
  renderPrivatePulse();
  renderLibrary();
  renderContextReview();
  renderBridgePanel();
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

function safeModuleTone(value) {
  const tone = compactText(value, "calendar").toLowerCase().replace(/[^a-z-]/g, "");
  return ["weather", "calendar", "training", "pokemon", "news", "chess", "learning", "finance", "ai"].includes(tone) ? tone : "calendar";
}

function buildProactiveBrief() {
  const recommendation = buildRecommendation();
  const trainingDecision = buildTrainingIntelligence();
  const pokemonEvent = primaryPokemonEvent();
  const topNews = newsState.items[0];
  const pendingImports = pendingContextImports();
  const nextMemory = pendingImports.find((item) => /chatgpt|note|personal|file/i.test(item.source)) || pendingImports[0];
  const privateSourceCount = privateDaily.sources.length;
  const weatherWatch =
    weatherState.status === "live" && parseInt(weatherState.rain, 10) >= 40
      ? `Rain chance is ${weatherState.rain}; keep a dry training option ready.`
      : "";

  const items = [
    {
      label: "Do",
      title: recommendation.title,
      detail: recommendation.body,
      source: recommendation.reason,
    },
    {
      label: "Watch",
      title: trainingDecision.readiness === "Low" ? "Recovery is the constraint" : pokemonEvent?.title || "Today window",
      detail:
        weatherWatch ||
        (pokemonEvent ? `${pokemonEvent.window}: ${summarizePokemonEvent(pokemonEvent)}` : trainingDecision.detail),
      source: pokemonEvent?.source || trainingDecision.source,
    },
    {
      label: "Learn",
      title: nextMemory ? `Review ${nextMemory.title}` : privateSourceCount ? "Use the private packet" : "Import ChatGPT context",
      detail: nextMemory
        ? contextPreview(nextMemory.body)
        : privateSourceCount
          ? `${privateSourceCount} private sources are available for recommendations.`
          : "Drop in a ChatGPT export or personal summary so Ben HQ can start finding patterns.",
      source: nextMemory?.source || (privateSourceCount ? privateDailyFreshness() : "Local-only intake"),
    },
  ];

  return items;
}

function buildCommandBrief() {
  const recommendation = buildRecommendation();
  const trainingDecision = buildTrainingIntelligence();
  const pokemonEvent = primaryPokemonEvent();
  const pendingImports = pendingContextImports();
  const privateSourceCount = privateDaily.sources.length;
  const rainChance = parseInt(weatherState.rain, 10);
  const weatherConstraint = weatherState.status === "live" && rainChance >= 55;
  const sourceLine = privateSourceCount
    ? `${privateSourceCount} private sources loaded`
    : pendingImports.length
      ? `${pendingImports.length} memory item${pendingImports.length === 1 ? "" : "s"} waiting`
      : "public signals only";

  const situation = pokemonEvent?.isActive
    ? `${pokemonEvent.title} is active. ${summarizePokemonEvent(pokemonEvent)}`
    : privateDaily.summary || (topNews ? `${topNews.source}: ${topNews.title}` : `${trainingDecision.title} is the useful training choice. ${sourceLine}.`);

  const eventActions = pokemonEvent?.isActive ? pokemonActionPlan(pokemonEvent) : [];
  const action = privateDaily.recommendations[0]?.title
    ? `${privateDaily.recommendations[0].title}: ${privateDaily.recommendations[0].detail || "Use the private packet recommendation."}`
    : eventActions.length
      ? `Use one deliberate ${pokemonEvent.title} window`
      : topNews
        ? `Skim the current ${topNews.tags?.[0] || "tech"} shift`
      : recommendation.reason === "Weather is only a constraint"
        ? trainingDecision.title
        : recommendation.title;

  const actionDetail =
    privateDaily.recommendations[0]?.detail ||
    (eventActions.length ? eventActions.slice(0, 3).join(" Then ") : topNews ? newsWhyItMatters(topNews) : recommendation.body || trainingDecision.detail);
  const ignore = weatherConstraint
    ? "Ignore exact pace or mileage if rain closes the window."
    : pokemonEvent?.isActive
      ? "Ignore completionist event grinding; use one deliberate play window."
      : pendingImports.length
        ? "Ignore new capture. Review one existing memory item first."
        : "Ignore dashboard maintenance; only act on the visible high-signal cards.";

  return [
    {
      label: "Situation",
      title: pokemonEvent?.isActive ? pokemonEvent.title : sourceLine,
      detail: situation,
      source: pokemonEvent?.source || topNews?.source || trainingDecision.source,
    },
    {
      label: "Action",
      title: action,
      detail: actionDetail,
      source: eventActions.length ? pokemonEvent.source : topNews?.source || recommendation.reason,
    },
    {
      label: "Ignore",
      title: "What not to spend energy on",
      detail: ignore,
      source: "Ben HQ filter",
    },
  ];
}

function todayModeLabel() {
  const trainingDecision = buildTrainingIntelligence();
  const pokemonEvent = primaryPokemonEvent();
  if (pendingContextImports().length > 0) return "Review";
  if (trainingDecision.readiness === "Low") return "Recover";
  if (pokemonEvent?.isActive) return "Event";
  if (hasPrivateDailyData()) return "Act";
  return "Focus";
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
  const event = primaryPokemonEvent();
  const insights = [
    ...(event
      ? [
          {
            label: "Pokemon",
            value: event.isActive ? "Active" : "Next",
            detail: `${event.title} - ${event.window}`,
          },
        ]
      : []),
    ...seed.todayInsights,
  ].slice(0, 3);
  target.innerHTML = insights
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
  const privateAgenda = [...privateDaily.agenda, ...privateDaily.calendarEvents].slice(0, 4);
  const agendaItems = privateAgenda.length ? privateAgenda : seed.todayAgenda;
  const heading = privateAgenda.length ? "Personal agenda loaded" : "High-signal plan";
  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon calendar-icon" aria-hidden="true">Cal</span>
      <p class="eyebrow">Today agenda</p>
    </div>
    <h3>${heading}</h3>
    <div class="agenda-list">
      ${agendaItems
        .map(
          (item) => `
            <div class="agenda-item module-${safeModuleTone(item.tone)}">
              <span>${escapeHtml(item.time)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <p>${escapeHtml(item.detail)}</p>
                ${item.source ? `<em>${escapeHtml(item.source)}</em>` : ""}
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderTodayWorkout() {
  const target = document.getElementById("todayWorkoutCard");
  if (!target) return;
  const decision = buildTrainingIntelligence();

  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon training-icon" aria-hidden="true">Run</span>
      <p class="eyebrow">Today's workout</p>
    </div>
    <h3>${escapeHtml(decision.title)}</h3>
    <p>${escapeHtml(decision.detail)}</p>
    <div class="mini-fact-grid">
      <span><strong>${escapeHtml(decision.duration)}</strong> plan</span>
      <span><strong>${escapeHtml(decision.readiness)}</strong> readiness</span>
      <span><strong>${escapeHtml(decision.fallback)}</strong> fallback</span>
    </div>
    <span class="source-badge">${escapeHtml(decision.source)}</span>
  `;
}

function renderTodayPokemon() {
  const target = document.getElementById("todayPokemonCard");
  if (!target) return;
  const event = primaryPokemonEvent();
  const actions = pokemonActionPlan(event).slice(0, 3);
  const source = compactText(event?.source, pokemonLiveState.sourceNote || "Public event plan");
  const summary = summarizePokemonEvent(event);
  const windowText = compactText(event?.window, "Check event timing");

  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon pokemon-icon" aria-hidden="true">GO</span>
      <p class="eyebrow">${escapeHtml(event?.isActive ? "Pokemon GO - active now" : "Pokemon GO")}</p>
    </div>
    <h3>${escapeHtml(event?.title || "Pokemon GO plan")}</h3>
    <p>${escapeHtml(summary)}</p>
    <div class="mini-fact-grid">
      <span><strong>${escapeHtml(event?.isActive ? "Now" : "Next")}</strong> status</span>
      <span><strong>${escapeHtml(windowText)}</strong> window</span>
      <span><strong>${escapeHtml(pokemonLiveState.raids)}</strong> raids</span>
    </div>
    <ul class="compact-action-list">
      ${actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
    </ul>
    <span class="source-badge">${escapeHtml(source)}</span>
  `;
}

function renderTodayNews() {
  const target = document.getElementById("todayNewsCard");
  if (!target) return;
  const items = newsState.items.length ? newsState.items.slice(0, 3) : fallbackNewsItems().slice(0, 2);
  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon news-icon" aria-hidden="true">Nw</span>
      <p class="eyebrow">Current news - ${escapeHtml(newsState.status)}</p>
    </div>
    <h3>${escapeHtml(items[0]?.title || "Current briefing loading")}</h3>
    <p>${escapeHtml(newsState.overview)}</p>
    <div class="news-mini-list">
      ${items
        .map(
          (item) => `
            <a class="news-mini-item" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.source)} - ${escapeHtml(relativeTime(item.publishedAt))}</span>
            </a>
          `,
        )
        .join("")}
    </div>
    <div class="source-row">
      <span class="source-badge">${escapeHtml(newsState.sourceNote)}</span>
      <button class="text-button" data-view="news" type="button">News room</button>
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
  const privateEvents = privateDaily.calendarEvents.slice(0, 8);
  const privateCards = privateEvents.length
    ? [
        `
          <article class="day-card module-calendar">
            <strong>Today</strong>
            ${privateEvents.map((event) => `<span class="calendar-chip">${escapeHtml(event.time)} - ${escapeHtml(event.title)}</span>`).join("")}
          </article>
        `,
      ]
    : [];
  const seedCards = seed.calendar
    .map(
      (day) => `
        <article class="day-card">
          <strong>${day.day}</strong>
          ${day.events.map((event) => `<span class="calendar-chip">${event}</span>`).join("")}
        </article>
      `,
    );
  document.getElementById("calendarGrid").innerHTML = [...privateCards, ...seedCards].join("");
  const freshness = document.getElementById("calendarFreshness");
  if (freshness) freshness.textContent = privateEvents.length ? privateDailyFreshness() : "Internal preview";
}

function renderTrainingOverview() {
  const hasPrivateTraining = hasPrivateDailyData() && (Object.keys(privateDaily.training || {}).length || Object.keys(privateDaily.health || {}).length);
  const training = privateDaily.training || {};
  const health = privateDaily.health || {};
  const decision = buildTrainingIntelligence();
  const title = hasPrivateTraining ? compactText(training.title || health.title, seed.training.title) : seed.training.title;
  const summaryText = hasPrivateTraining
    ? compactText(training.summary || health.summary || health.readinessNote, seed.training.summary)
    : seed.training.summary;
  const metrics = hasPrivateTraining
    ? [
        { value: compactText(decision.sleep, "--"), label: "sleep" },
        { value: compactText(decision.steps, "--"), label: "steps" },
        { value: compactText(decision.readiness, "check"), label: "readiness" },
      ]
    : seed.training.metrics;
  const readinessItems = hasPrivateTraining ? decision.rules : seed.training.readiness;
  const summaryCard = document.getElementById("trainingSummaryCard");
  if (summaryCard) {
    summaryCard.innerHTML = `
      <p class="eyebrow">This week</p>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(summaryText)}</p>
      <div class="training-decision">
        <span>Today</span>
        <strong>${escapeHtml(decision.title)}</strong>
        <p>${escapeHtml(decision.detail)}</p>
      </div>
      <div class="metric-row">
        ${metrics
          .map((metric) => `<span><strong>${escapeHtml(metric.value)}</strong> ${escapeHtml(metric.label)}</span>`)
          .join("")}
      </div>
    `;
  }

  const readinessCard = document.getElementById("trainingReadinessCard");
  if (readinessCard) {
    readinessCard.innerHTML = `
      <div class="module-header">
        <span class="module-icon training-icon" aria-hidden="true">Fit</span>
        <p class="eyebrow">Readiness rules</p>
      </div>
      <h3>Choose the version that protects tomorrow.</h3>
      <div class="training-rule-list">
        ${readinessItems
          .map(
            (item) => `
              <div class="training-rule">
                <span>${escapeHtml(item.label)}</span>
                <div>
                  <strong>${escapeHtml(item.value)}</strong>
                  <p>${escapeHtml(item.detail)}</p>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }
  const freshness = document.getElementById("trainingFreshness");
  if (freshness) freshness.textContent = hasPrivateTraining ? privateDailyFreshness() : "Generated from constraints";
}

function renderWorkouts() {
  document.getElementById("workoutStack").innerHTML = seed.workouts
    .map(
      (workout) => `
        <article class="glass-card workout-detail-card module-training">
          <div class="module-header">
            <span class="module-icon training-icon" aria-hidden="true">Run</span>
            <p class="eyebrow">${escapeHtml(workout.tag)} - ${escapeHtml(workout.meta)}</p>
          </div>
          <div class="workout-detail-head">
            <h3>${escapeHtml(workout.title)}</h3>
            <span class="source-badge">${escapeHtml(workout.meta)}</span>
          </div>
          <p>${escapeHtml(workout.purpose)}</p>
          <div class="workout-prescription">
            <div>
              <strong>Do this</strong>
              <ol>
                ${workout.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
              </ol>
            </div>
            <div>
              <strong>If tired</strong>
              <p>${escapeHtml(workout.fallback)}</p>
            </div>
          </div>
          <div class="tag-row">
            ${workout.checklist.map((item) => `<span class="tag-pill">${escapeHtml(item)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPokemon() {
  const activeEvents = currentPokemonEvents();
  const featuredEvent = primaryPokemonEvent();
  const eventCards = activeEvents.slice(0, 4).map((event) => {
    const actions = pokemonActionPlan(event);
    const bonuses = asArray(event.bonuses).slice(0, 3);
    return `
        <article class="glass-card action-card module-pokemon pokemon-event-card ${event.isActive ? "is-active" : ""}">
          <div class="module-header">
            <span class="module-icon pokemon-icon" aria-hidden="true">${event.isActive ? "Now" : "GO"}</span>
            <p class="eyebrow">${escapeHtml(event.type)} - ${escapeHtml(event.window)}</p>
          </div>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(summarizePokemonEvent(event))}</p>
          ${
            bonuses.length
              ? `<div class="tag-row">${bonuses.map((bonus) => `<span class="tag-pill">${escapeHtml(bonus)}</span>`).join("")}</div>`
              : ""
          }
          <ul class="check-list">
            ${actions.map((action) => `<li class="check-item"><span class="task-check"></span><span>${escapeHtml(action)}</span></li>`).join("")}
          </ul>
          <span class="source-badge">${escapeHtml(event.source)}</span>
        </article>
      `;
  });

  const todayBrief = `
        <article class="liquid-panel action-card module-pokemon pokemon-brief-card">
          <div class="module-header">
            <span class="module-icon pokemon-icon" aria-hidden="true">GO</span>
            <p class="eyebrow">Today's Pokemon plan</p>
          </div>
          <h3>${escapeHtml(featuredEvent?.title || "Pokemon GO")}</h3>
          <p>${escapeHtml(summarizePokemonEvent(featuredEvent))}</p>
          <div class="pokemon-decision-grid">
            <span><strong>${escapeHtml(featuredEvent?.isActive ? "Play" : "Prep")}</strong> decision</span>
            <span><strong>${escapeHtml(featuredEvent?.window || "Timing TBD")}</strong> window</span>
            <span><strong>${escapeHtml(pokemonLiveState.sourceNote)}</strong> source</span>
          </div>
        </article>
  `;

  const liveCard = `
        <article class="glass-card action-card module-pokemon">
          <div class="module-header">
            <span class="module-icon pokemon-icon" aria-hidden="true">GO</span>
            <p class="eyebrow">${escapeHtml(pokemonLiveState.status)} public pulse</p>
          </div>
          <h3>Live reference data</h3>
          <p>Account-free public data for released Pokemon, shiny availability, nesting species, raid tiers, and current-event checks.</p>
          <div class="weather-metrics source-metrics" aria-label="Pokemon GO public data">
            <span><strong>${pokemonLiveState.released}</strong> released</span>
            <span><strong>${pokemonLiveState.shiny}</strong> shiny</span>
            <span><strong>${pokemonLiveState.nesting}</strong> nesting</span>
            <span><strong>${pokemonLiveState.raids}</strong> raid slots</span>
          </div>
          <div class="source-row">
            <span class="source-badge">${escapeHtml(pokemonLiveState.sourceNote)}</span>
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

  document.getElementById("pokemonCards").innerHTML = [todayBrief, liveCard, ...eventCards, ...planningCards.slice(2)].join("");
}

function renderNews() {
  const target = document.getElementById("newsCards");
  if (!target) return;
  const freshness = document.getElementById("newsFreshness");
  if (freshness) {
    freshness.textContent = newsState.updated ? `Updated ${newsState.updated}` : sourceStatusLabel(sourceHealthState.news);
  }
  const items = newsState.items.length ? newsState.items : fallbackNewsItems();
  const sourceCards = newsState.sources.length
    ? newsState.sources
    : [
        { label: "TechCrunch", status: "loading", count: 0 },
        { label: "VentureBeat", status: "loading", count: 0 },
        { label: "BBC / GDELT", status: "loading", count: 0 },
        { label: "Hacker News", status: "loading", count: 0 },
      ];

  const overviewCard = `
    <article class="liquid-panel action-card module-news news-brief-card">
      <div class="module-header">
        <span class="module-icon news-icon" aria-hidden="true">Nw</span>
        <p class="eyebrow">AI overview</p>
      </div>
      <h3>${escapeHtml(newsState.status === "live" ? "What changed in your lanes" : "Current briefing")}</h3>
      <p>${escapeHtml(newsState.overview)}</p>
      <div class="source-status-list news-source-list">
        ${sourceCards
          .map(
            (source) => `
              <span class="source-status" data-state="${source.status}">
                <strong>${escapeHtml(sourceStatusLabel(source.status))}</strong>
                ${escapeHtml(source.label)}${source.count ? ` (${source.count})` : ""}
              </span>
            `,
          )
          .join("")}
      </div>
      <div class="source-row">
        <span class="source-badge">${escapeHtml(newsState.sourceNote)}</span>
        <button class="text-button" data-action="refresh-news" type="button">Refresh</button>
      </div>
    </article>
  `;

  const storyCards = items.slice(0, 8).map(
    (item) => `
      <article class="glass-card action-card module-news news-story-card">
        <div class="module-header">
          <span class="module-icon news-icon" aria-hidden="true">${escapeHtml(item.sourceKey === "hacker-news" ? "HN" : item.sourceKey === "bbc" ? "BBC" : "Nw")}</span>
          <p class="eyebrow">${escapeHtml(item.source)} - ${escapeHtml(relativeTime(item.publishedAt))}</p>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary || newsWhyItMatters(item))}</p>
        <div class="news-tag-row">
          ${(item.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="news-why">
          <span>Why it matters</span>
          <p>${escapeHtml(newsWhyItMatters(item))}</p>
        </div>
        <a class="text-button" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Read source</a>
      </article>
    `,
  );

  const youtubeCard = `
    <article class="glass-card action-card module-news news-youtube-card">
      <div class="module-header">
        <span class="module-icon news-icon" aria-hidden="true">YT</span>
        <p class="eyebrow">YouTube radar</p>
      </div>
      <h3>Fresh video lanes to scan</h3>
      <p>YouTube needs either channel choices or an API key for true automatic ingestion. For now, these open recency-sorted searches in your interest lanes.</p>
      <div class="news-mini-list">
        ${youtubeRadarLinks
          .map(
            (link) => `
              <a class="news-mini-item" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">
                <strong>${escapeHtml(link.title)}</strong>
                <span>${escapeHtml(link.detail)}</span>
              </a>
            `,
          )
          .join("")}
      </div>
    </article>
  `;

  target.innerHTML = [overviewCard, ...storyCards, youtubeCard].join("");
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
  return ["weather", "pokemon", "news", "lichess", "private"].filter((key) => sourceHealthState[key] === "live").length;
}

function renderSourceHealth() {
  const target = document.getElementById("sourceHealthCard");
  if (!target) return;

  const statuses = [
    { label: "Weather", state: sourceHealthState.weather },
    { label: "Pokemon GO", state: sourceHealthState.pokemon },
    { label: "News", state: sourceHealthState.news },
    { label: "Lichess", state: sourceHealthState.lichess },
    { label: "Auto Sync", state: sourceHealthState.private },
    { label: "Local memory", state: sourceHealthState.local },
  ];

  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon ai-icon" aria-hidden="true">Src</span>
      <p class="eyebrow">Source health</p>
    </div>
    <h3>${liveSourceCount()} of 5 approved signals live</h3>
    <p>Public signals refresh in-browser. Private summaries load from encrypted Auto Sync packets when configured.</p>
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

function privatePulseItems() {
  return [
    ...privateDaily.mail.needsReply.map((item) => ({ ...item, group: "Reply" })),
    ...privateDaily.mail.highlights.map((item) => ({ ...item, group: "Mail" })),
    ...privateDaily.calendarEvents.map((item) => ({ title: item.title, detail: item.detail, meta: item.time, source: item.source, group: "Calendar" })),
    ...privateDaily.notes.items.map((item) => ({ ...item, group: "Notes" })),
    ...privateDaily.drive.items.map((item) => ({ ...item, group: "Drive" })),
  ].slice(0, 5);
}

function renderPrivatePulse() {
  const target = document.getElementById("privatePulseCard");
  if (!target) return;
  const items = privatePulseItems();
  if (!items.length) {
    target.innerHTML = `
      <div class="module-header">
        <span class="module-icon finance-icon" aria-hidden="true">Src</span>
        <p class="eyebrow">Personal pulse</p>
      </div>
      <h3>Private sources ready</h3>
      <p>Connect the daily bridge or import a packet to surface Gmail, Calendar, Drive, Notes, Garmin, and Apple Health summaries here.</p>
      <button class="text-button" data-view="sources">Set up sources</button>
    `;
    return;
  }

  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon finance-icon" aria-hidden="true">Src</span>
      <p class="eyebrow">Personal pulse</p>
    </div>
    <h3>${privateDaily.summary ? escapeHtml(privateDaily.summary) : "Private daily signal"}</h3>
    <div class="pulse-list">
      ${items
        .map(
          (item) => `
            <div class="pulse-item">
              <span>${escapeHtml(item.group)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <p>${escapeHtml(item.detail || item.meta || item.source || "")}</p>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
    <span class="source-badge">${escapeHtml(privateDailyFreshness())}</span>
  `;
}

function buildRecommendation() {
  const openToday = seed.todayTasks.filter((task) => !completedTasks.has(taskId(task))).length;
  const openInbox = capturedItems.filter((task) => !completedTasks.has(taskId(task))).length;
  const rainy = /\b(rain|showers|thunderstorm|drizzle)\b/i.test(weatherState.summary) || parseInt(weatherState.rain, 10) >= 45;
  const pokemonEvent = primaryPokemonEvent();
  const trainingDecision = buildTrainingIntelligence();

  if (rainy) {
    return {
      title: "Use the indoor fallback if rain closes the window",
      body: "Do not negotiate with the weather all day. If the outside window is messy, take the mobility/core version and move on.",
      reason: "Weather is only a constraint",
    };
  }

  if (pokemonEvent?.isActive) {
    return {
      title: `Use the ${pokemonEvent.title} window deliberately`,
      body: pokemonActionPlan(pokemonEvent).slice(0, 2).join(" Then ") || summarizePokemonEvent(pokemonEvent),
      reason: `${pokemonEvent.window} is active`,
    };
  }

  if (trainingDecision.readiness === "Low") {
    return {
      title: "Take the recovery version",
      body: trainingDecision.detail,
      reason: "Health/training signal says keep load low",
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

  if (privateDaily.recommendations.length > 0) {
    const item = privateDaily.recommendations[0];
    return {
      title: item.title,
      body: item.detail || "Private bridge found a useful next action for today.",
      reason: item.source || "Private daily packet",
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

function renderCommandBrief() {
  const target = document.getElementById("commandBriefCard");
  if (!target) return;
  const items = buildCommandBrief();
  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon ai-icon" aria-hidden="true">HQ</span>
      <p class="eyebrow">Command brief</p>
    </div>
    <h3>What is actually worth noticing</h3>
    <div class="brief-action-list">
      ${items
        .map(
          (item) => `
            <div class="brief-action">
              <span>${escapeHtml(item.label)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <p>${escapeHtml(item.detail)}</p>
                <em>${escapeHtml(item.source)}</em>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderDailySignals() {
  const completedToday = seed.todayTasks.filter((task) => completedTasks.has(taskId(task))).length;
  const sourceCount = liveSourceCount();
  const weatherWord = weatherState.status === "live" ? weatherState.temp : "--";
  const sourceWord = `${sourceCount}/5`;
  const pokemonEvent = primaryPokemonEvent();
  const eventBrief = pokemonEvent
    ? `${pokemonEvent.title}: ${summarizePokemonEvent(pokemonEvent)}`
    : "Pokemon GO events will appear here when the public feed or curated fallback has a current window.";
  const trainingDecision = buildTrainingIntelligence();

  document.getElementById("priorityCount").textContent = seed.priorities.length;
  document.getElementById("weatherSignal").textContent = weatherWord;
  document.getElementById("sourceSignal").textContent = sourceWord;
  document.getElementById("dailySignalScore").textContent = todayModeLabel();
  document.getElementById("dailyBrief").textContent =
    privateDaily.summary ||
    `${eventBrief} Training: ${trainingDecision.title}. Keep the day concrete: one useful workout choice, one event plan, and one small personal loop.`;
}

function renderIntelligence() {
  renderSourceHealth();
  renderDailySignals();
  renderTodayNews();
  renderRecommendation();
  renderCommandBrief();
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

function renderBridgePanel() {
  const urlInput = document.getElementById("bridgeUrl");
  const passcodeInput = document.getElementById("bridgePasscode");
  if (urlInput && document.activeElement !== urlInput) urlInput.value = bridgeSettings.url;
  if (passcodeInput && document.activeElement !== passcodeInput) passcodeInput.value = bridgeSettings.passcode;

  const target = document.getElementById("bridgeStatusCard");
  if (!target) return;
  const hasPacket = hasPrivateDailyData();
  const sourceCount = privateDaily.sources.length || [
    privateDaily.calendarEvents.length,
    privateDaily.mail.highlights.length + privateDaily.mail.needsReply.length,
    privateDaily.drive.items.length,
    privateDaily.notes.items.length,
    Object.keys(privateDaily.health || {}).length,
  ].filter(Boolean).length;

  target.innerHTML = `
    <div class="bridge-status-head">
      <strong>${autoSyncSettings.key ? "Auto Sync key saved" : "Auto Sync not set up"}</strong>
      <span class="source-status" data-state="${sourceHealthState.private}">${sourceStatusLabel(sourceHealthState.private)}</span>
    </div>
    <div class="local-data-metrics">
      <span><strong>${sourceCount}</strong> sources</span>
      <span><strong>${privateDaily.calendarEvents.length}</strong> events</span>
      <span><strong>${privateDaily.mail.needsReply.length}</strong> replies</span>
      <span><strong>${privateDaily.recommendations.length}</strong> recs</span>
    </div>
    <p class="item-meta">${
      hasPacket
        ? escapeHtml(privateDailyFreshness())
        : autoSyncSettings.key
          ? "Auto Sync is configured. Waiting for the first encrypted packet."
          : "Open the one-time setup link to enable automatic encrypted updates."
    }</p>
    ${autoSyncSettings.lastSyncAt ? `<p class="item-meta">Auto Sync checked ${escapeHtml(new Date(autoSyncSettings.lastSyncAt).toLocaleString())}</p>` : ""}
    ${autoSyncSettings.error ? `<p class="danger-note">${escapeHtml(autoSyncSettings.error)}</p>` : ""}
    ${bridgeSettings.error ? `<p class="danger-note">${escapeHtml(bridgeSettings.error)}</p>` : ""}
  `;
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

  const packetTarget = document.getElementById("privatePacketCard");
  if (!packetTarget) return;
  const hasPacket = hasPrivateDailyData();
  packetTarget.innerHTML = `
    <h3>Private packet</h3>
    <p>${hasPacket ? "Daily summaries are loaded on this device." : "No private daily packet has been imported on this device yet."}</p>
    <div class="local-data-metrics">
      <span><strong>${privateDaily.mail.highlights.length}</strong> mail</span>
      <span><strong>${privateDaily.calendarEvents.length}</strong> events</span>
      <span><strong>${privateDaily.notes.items.length + privateDaily.drive.items.length}</strong> notes/files</span>
      <span><strong>${privateDaily.recommendations.length}</strong> recs</span>
    </div>
    <div class="settings-actions">
      <button class="secondary-button" data-view="sources" type="button">Sources</button>
      <button class="secondary-button" data-action="import-daily-packet" type="button">Import packet</button>
      <button class="text-button danger-text" data-action="clear-private-daily" type="button">Clear packet</button>
    </div>
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
      const rawText = await readTextFile(file);
      if (/\.json$/i.test(file.name)) {
        try {
          const parsed = JSON.parse(rawText);
          const chatGptInsights = extractChatGptExportInsights(parsed, file.name);
          if (chatGptInsights.length) {
            imported.push(...chatGptInsights);
            continue;
          }
        } catch (error) {
          // Fall through to ordinary text import when JSON parsing fails.
        }
      }
      const text = cleanImportedFileBody(file, rawText);
      if (text) {
        imported.push(
          normalizeContextImport({
            id: makeContextId(),
            source: /chatgpt|openai|conversation/i.test(file.name) ? "ChatGPT" : "File",
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
  if (validImports.some((item) => item.source === "ChatGPT")) {
    alert(`${validImports.filter((item) => item.source === "ChatGPT").length} ChatGPT insight cards are ready for review.`);
  }
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
      privateDaily = normalizePrivateDailyPacket(payload.privateDaily, "stored");
      sourceHealthState.private = hasPrivateDailyData() ? "live" : "offline";
      saveCapturedItems();
      saveCompletedTasks();
      saveContextImports();
      savePrivateDaily();
      refreshLocalSurfaces();
      navigate("library");
    } catch (error) {
      alert("That file does not look like a Ben HQ local data export.");
    }
  });
  reader.readAsText(file);
}

function applyPrivateDailyPacket(payload, origin = "import") {
  const normalized = normalizePrivateDailyPacket(payload, origin);
  if (!hasPrivateDailyData(normalized)) {
    alert("That file did not contain a readable Ben HQ daily packet.");
    return false;
  }
  privateDaily = {
    ...normalized,
    status: origin === "bridge" ? "live" : "imported",
    importedAt: new Date().toISOString(),
  };
  sourceHealthState.private = "live";
  bridgeSettings.error = "";
  if (origin === "bridge") {
    bridgeSettings.status = "live";
    bridgeSettings.lastSyncAt = new Date().toISOString();
    saveBridgeSettings();
  }
  savePrivateDaily();
  refreshLocalSurfaces();
  return true;
}

function loadStarterPacket() {
  applyPrivateDailyPacket(starterDailyPacket, "starter");
  navigate("today");
}

async function copyTextToClipboard(text, successMessage) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    alert(successMessage);
  } catch (error) {
    alert("Copy failed. Try again from a desktop browser if iPhone blocks clipboard access.");
  }
}

function copyGoogleBridgeScript() {
  copyTextToClipboard(
    googleBridgeScriptTemplate,
    "Google bridge script copied. Paste it into a new Google Apps Script project in your personal Google account.",
  );
}

function copyPacketTemplate() {
  copyTextToClipboard(
    JSON.stringify(starterDailyPacket, null, 2),
    "Daily packet template copied. Use this shape for iPhone Shortcuts, Apple Health, Garmin, Notes, or manual imports.",
  );
}

function importDailyPacket(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(String(reader.result || "{}"));
      if (applyPrivateDailyPacket(payload, "import")) {
        navigate("today");
      }
    } catch (error) {
      alert("That file is not valid JSON.");
    }
  });
  reader.readAsText(file);
}

function saveBridgeFromForm() {
  const url = document.getElementById("bridgeUrl")?.value.trim() || "";
  const passcode = document.getElementById("bridgePasscode")?.value.trim() || "";
  if (!url) {
    bridgeSettings = {
      ...bridgeSettings,
      status: "not configured",
      error: "Paste the Google Apps Script Web App URL here after you deploy the bridge.",
    };
    saveBridgeSettings();
    renderBridgePanel();
    return false;
  }
  bridgeSettings = {
    ...bridgeSettings,
    url,
    passcode,
    status: url ? "saved" : "not configured",
    error: "",
  };
  saveBridgeSettings();
  renderBridgePanel();
  return true;
}

function bridgeRequestUrl() {
  const url = new URL(bridgeSettings.url);
  if (bridgeSettings.passcode) url.searchParams.set("key", bridgeSettings.passcode);
  url.searchParams.set("format", "ben-hq-daily");
  return url.toString();
}

async function syncPrivateBridge() {
  if (!saveBridgeFromForm()) {
    alert("Load the starter packet for now, or copy the Google script and paste its deployed Web App URL here.");
    return;
  }
  sourceHealthState.private = "loading";
  bridgeSettings.status = "syncing";
  bridgeSettings.error = "";
  saveBridgeSettings();
  renderBridgePanel();
  renderIntelligence();

  try {
    const response = await fetch(bridgeRequestUrl(), { cache: "no-store" });
    if (!response.ok) throw new Error(`Bridge request failed: ${response.status}`);
    const payload = await response.json();
    applyPrivateDailyPacket(payload, "bridge");
    navigate("today");
  } catch (error) {
    sourceHealthState.private = hasPrivateDailyData() ? "live" : "offline";
    bridgeSettings.status = "error";
    bridgeSettings.error = "Private bridge sync failed. Check the URL, passcode, deployment access, and CORS.";
    saveBridgeSettings();
    renderBridgePanel();
    renderIntelligence();
  }
}

function clearPrivateBridge() {
  bridgeSettings = loadBridgeSettings();
  bridgeSettings.url = "";
  bridgeSettings.passcode = "";
  bridgeSettings.status = "not configured";
  bridgeSettings.error = "";
  saveBridgeSettings();
  renderBridgePanel();
}

function clearPrivateDaily() {
  privateDaily = emptyPrivateDaily();
  sourceHealthState.private = "offline";
  removeStoredItem(storageKeys.privateDaily);
  refreshLocalSurfaces();
}

function clearAutoSync() {
  autoSyncSettings = {
    key: "",
    lastSyncAt: "",
    status: "not configured",
    error: "",
  };
  removeStoredItem(storageKeys.autoSync);
  renderBridgePanel();
  renderIntelligence();
}

function resetLocalData() {
  if (!confirm("Reset local Ben HQ captures and checkmarks on this device?")) return;
  removeStoredItem(storageKeys.captures);
  removeStoredItem(storageKeys.completed);
  removeStoredItem(storageKeys.contextImports);
  removeStoredItem(storageKeys.privateDaily);
  removeStoredItem(storageKeys.autoSync);
  capturedItems = [...seed.inbox];
  completedTasks = new Set();
  contextImports = [];
  privateDaily = emptyPrivateDaily();
  autoSyncSettings = loadAutoSyncSettings();
  sourceHealthState.private = "offline";
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

function raidSlotCount(value) {
  if (!value || typeof value !== "object") return 0;
  if (Array.isArray(value)) return value.length;
  return Object.values(value).reduce((sum, tier) => sum + asArray(tier).filter((item) => item && item.template !== "UNSET").length, 0);
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
    sourceNote: "Refreshing Pokemon GO public data...",
    updated: "",
  };
  renderTodayPokemon();
  renderPokemon();
  renderIntelligence();

  try {
    const data = await sourceAdapters.pogo.fetch();
    const activeEvents = normalizePokemonEvents(data.events);
    const fallbackEvents = fallbackPokemonEvents().map((event) => normalizePokemonEvent(event)).filter(Boolean).sort(sortPokemonEvents);
    const usableEvents = (activeEvents.length ? activeEvents : fallbackEvents).sort(sortPokemonEvents);
    pokemonLiveState = {
      status: "live",
      released: formatInteger(objectCount(data.released)),
      shiny: formatInteger(objectCount(data.shiny)),
      nesting: formatInteger(objectCount(data.nesting)),
      raids: formatInteger(raidSlotCount(data.raids)),
      activeEvents: usableEvents,
      featuredEvent: usableEvents[0] || null,
      sourceNote: activeEvents.length ? "PogoInfo current event feed" : "Curated fallback; public event feed stale",
      updated: formatShortTime(),
    };
    sourceHealthState.pokemon = "live";
  } catch (error) {
    const fallbackEvents = fallbackPokemonEvents().map((event) => normalizePokemonEvent(event)).filter(Boolean).sort(sortPokemonEvents);
    pokemonLiveState = {
      status: "offline",
      released: "--",
      shiny: "--",
      nesting: "--",
      raids: "--",
      activeEvents: fallbackEvents,
      featuredEvent: fallbackEvents[0] || null,
      sourceNote: "Curated fallback; public Pokemon feeds unavailable",
      updated: "",
    };
    sourceHealthState.pokemon = "offline";
  }

  renderTodayInsights();
  renderTodayPokemon();
  renderPokemon();
  renderIntelligence();
}

async function refreshNewsLiveData() {
  sourceHealthState.news = "loading";
  newsState = {
    ...newsState,
    status: "loading",
    overview: "Refreshing a focused public news briefing...",
    sourceNote: "Checking TechCrunch, VentureBeat, BBC, Hacker News, and YouTube radar.",
    updated: "",
  };
  renderTodayNews();
  renderNews();
  renderIntelligence();

  try {
    const data = await sourceAdapters.news.fetch();
    const normalized = normalizeNewsResults(data);
    const liveSources = normalized.sources.filter((source) => source.status === "live");
    const items = normalized.items.length ? normalized.items : fallbackNewsItems();
    newsState = {
      status: liveSources.length ? "live" : "offline",
      updated: formatShortTime(),
      overview: buildNewsOverview(items),
      items,
      sources: normalized.sources,
      sourceNote: liveSources.length
        ? `${liveSources.length} public news source${liveSources.length === 1 ? "" : "s"} live`
        : "Public feeds blocked or unavailable; showing fallback lanes",
    };
    sourceHealthState.news = liveSources.length ? "live" : "offline";
  } catch (error) {
    const items = fallbackNewsItems();
    newsState = {
      status: "offline",
      updated: "",
      overview: buildNewsOverview(items),
      items,
      sources: [],
      sourceNote: "Public news feeds unavailable; showing fallback lanes",
    };
    sourceHealthState.news = "offline";
  }

  renderTodayNews();
  renderNews();
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
        const rankLabel = fileIndex === 0 ? `<span class="coord coord-rank">${rank}</span>` : "";
        const fileLabel = rank === 1 ? `<span class="coord coord-file">${"abcdefgh"[fileIndex]}</span>` : "";
        return `
          <button class="chess-square ${shade}${selected}${solvedTarget}" type="button" data-square="${square}" aria-label="${square}">
            ${content}
            ${rankLabel}
            ${fileLabel}
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
    if (actionButton?.dataset.action === "refresh-news") {
      refreshNewsLiveData();
    }
    if (actionButton?.dataset.action === "sync-private-bridge") {
      syncPrivateBridge();
    }
    if (actionButton?.dataset.action === "load-starter-packet") {
      loadStarterPacket();
    }
    if (actionButton?.dataset.action === "copy-google-bridge-script") {
      copyGoogleBridgeScript();
    }
    if (actionButton?.dataset.action === "copy-packet-template") {
      copyPacketTemplate();
    }
    if (actionButton?.dataset.action === "import-daily-packet") {
      document.getElementById("dailyPacketInput")?.click();
    }
    if (actionButton?.dataset.action === "clear-private-bridge") {
      clearPrivateBridge();
    }
    if (actionButton?.dataset.action === "clear-auto-sync") {
      clearAutoSync();
    }
    if (actionButton?.dataset.action === "clear-private-daily") {
      clearPrivateDaily();
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

  document.getElementById("captureForm")?.addEventListener("submit", (event) => {
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

  document.body.addEventListener("change", (event) => {
    if (event.target.id !== "dailyPacketInput") return;
    importDailyPacket(event.target.files?.[0]);
    event.target.value = "";
  });

  document.getElementById("bridgeSettingsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveBridgeFromForm();
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
  renderTodayWorkout();
  renderTodayPokemon();
  renderTodayNews();
  renderTasks();
  renderCalendar();
  renderTrainingOverview();
  renderWorkouts();
  renderPokemon();
  renderNews();
  renderLearning();
  renderPrompts();
  renderLibrary();
  renderReview();
  renderSources();
  renderPrivatePulse();
  renderContextReview();
  renderBridgePanel();
  renderLocalDataSettings();
  renderWeather();
  renderLichessDaily();
  renderChessBoard();
  formatToday();
  const importedSyncKey = importSyncKeyFromLocationHash();
  const importedFromLink = importPacketFromLocationHash();
  renderIntelligence();
  wireEvents();
  if (importedSyncKey || importedFromLink) {
    navigate("today");
  }
  refreshEncryptedAutoSync();
  refreshWeather();
  refreshNewsLiveData();
  refreshLichessDaily();
  refreshPokemonLiveData();
}

init();
