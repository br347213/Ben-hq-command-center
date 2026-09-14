from pathlib import Path

VERSION = "3.2.10"
LOGO_TAG = "logo-c5edccef-3.2.10"

app = Path("app.js")
text = app.read_text()
if 'const APP_VERSION = "3.2.8";' not in text and f'const APP_VERSION = "{VERSION}";' not in text:
    raise SystemExit("Unexpected APP_VERSION")
text = text.replace('const APP_VERSION = "3.2.8";', f'const APP_VERSION = "{VERSION}";', 1)

old_catch = '''  } catch {
    syncSettings.status = "error";
    syncSettings.progress = "";
    syncSettings.error = "The Garmin refresh did not finish.";
    saveSyncSettings();
    renderSyncStatus();
    showToast("Garmin did not finish refreshing. Your last good data is still here.");
  }
}'''
new_catch = '''  } catch {
    // If on-demand cloud dispatch is unavailable, still pull the newest published
    // Garmin snapshot and force a coaching refresh. Preserve last-known-good data
    // if even that fallback cannot complete.
    try {
      const packet = await fetchLatestPrivatePacket();
      installPrivatePacket(packet, true);
      const analyzed = await requestLiveAnalysis("manual snapshot refresh");
      showToast(analyzed
        ? "Latest Garmin snapshot checked and coaching refreshed."
        : "Latest Garmin snapshot checked. Live coaching analysis is unavailable right now.");
    } catch {
      syncSettings.status = "error";
      syncSettings.progress = "";
      syncSettings.error = "The Garmin refresh did not finish.";
      saveSyncSettings();
      renderSyncStatus();
      showToast("Garmin did not finish refreshing. Your last good data is still here.");
    }
  }
}'''
if old_catch in text:
    text = text.replace(old_catch, new_catch, 1)
app.write_text(text)

index = Path("index.html")
html = index.read_text()
html = html.replace("3.2.8", VERSION).replace("3.2.9", VERSION)
html = html.replace(f"assets/my-command-center-logo.png?v={VERSION}", f"assets/my-command-center-logo.png?v={LOGO_TAG}")
index.write_text(html)

sw = Path("sw.js")
s = sw.read_text()
s = s.replace('fitness-hq-v65', 'fitness-hq-v66').replace('fitness-hq-v64', 'fitness-hq-v66')
s = s.replace('3.2.8', VERSION).replace('3.2.9', VERSION)
s = s.replace(f"assets/my-command-center-logo.png?v={VERSION}", f"assets/my-command-center-logo.png?v={LOGO_TAG}")
s = s.replace(f'  "./app-hotfix.js?v={VERSION}",\n', '')
start = '  if (url.pathname.endsWith("/app.js")) {'
if start in s:
    begin = s.index(start)
    end_marker = '  event.respondWith(\n'
    end = s.index(end_marker, begin)
    s = s[:begin] + s[end:]
sw.write_text(s)

manifest = Path("manifest.webmanifest")
if manifest.exists():
    manifest.write_text(manifest.read_text().replace("3.2.8", VERSION).replace("3.2.9", VERSION))
