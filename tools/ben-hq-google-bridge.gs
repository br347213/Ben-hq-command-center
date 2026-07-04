const BEN_HQ_VERSION = "2026-07-04-private-bridge-1";

function doGet(event) {
  const configuredKey = PropertiesService.getScriptProperties().getProperty("BEN_HQ_PASSCODE");
  const providedKey = event && event.parameter ? event.parameter.key : "";

  if (configuredKey && providedKey !== configuredKey) {
    return jsonOutput({
      app: "Ben HQ",
      error: "Unauthorized",
      message: "Missing or incorrect Ben HQ bridge key.",
    });
  }

  return jsonOutput(buildBenHqDailyPacket());
}

function buildBenHqDailyPacket() {
  const now = new Date();
  const packet = {
    app: "Ben HQ",
    kind: "daily-packet",
    version: BEN_HQ_VERSION,
    generatedAt: now.toISOString(),
    summary: "Personal bridge synced Gmail, Calendar, and Drive metadata for today's planning surface.",
    sources: [
      { name: "Google Calendar", status: "synced", detail: "Default personal calendar, today only" },
      { name: "Gmail", status: "synced", detail: "Recent inbox thread metadata only" },
      { name: "Google Drive", status: "synced", detail: "Recently modified file metadata only" },
    ],
    calendar: {
      events: getTodayCalendarEvents(now),
    },
    gmail: {
      highlights: getInboxHighlights(),
      needsReply: getLikelyReplyThreads(),
    },
    drive: {
      recent: getRecentDriveFiles(now),
    },
    recommendations: buildRecommendations(),
  };

  return packet;
}

function getTodayCalendarEvents(now) {
  const calendar = CalendarApp.getDefaultCalendar();
  return calendar
    .getEventsForDay(now)
    .slice(0, 8)
    .map(function (event) {
      return {
        time: formatTimeWindow(event.getStartTime(), event.getEndTime()),
        title: event.getTitle(),
        detail: event.getLocation() || "Calendar event",
        source: "Google Calendar",
        tone: "calendar",
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
      source: "Gmail",
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
      source: "Gmail",
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
      source: "Google Drive",
    });
  }

  return results;
}

function buildRecommendations() {
  return [
    {
      title: "Scan the private pulse first",
      detail: "Review calendar anchors and reply-needed mail before adding new tasks.",
      source: "Ben HQ bridge",
    },
  ];
}

function cleanSender(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/"/g, "")
    .trim();
}

function formatTimeWindow(start, end) {
  const zone = Session.getScriptTimeZone();
  return Utilities.formatDate(start, zone, "h:mm a") + "-" + Utilities.formatDate(end, zone, "h:mm a");
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload, null, 2)).setMimeType(ContentService.MimeType.JSON);
}
