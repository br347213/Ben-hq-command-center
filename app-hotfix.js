(() => {
  const HOTFIX_VERSION = "3.2.9";

  async function refreshLatestSnapshotAndCoaching() {
    const button = document.getElementById("dashboardRefresh");
    if (!button || button.disabled) return;

    syncSettings.status = "checking";
    syncSettings.progress = "Checking latest Garmin snapshot";
    syncSettings.error = "";
    renderSyncStatus();

    try {
      const packet = await fetchLatestPrivatePacket();
      installPrivatePacket(packet, true);
      const analyzed = await requestLiveAnalysis("manual refresh");
      showToast(analyzed
        ? "Latest Garmin snapshot checked and coaching refreshed."
        : "Latest Garmin snapshot checked. Live coaching analysis is unavailable right now.");
    } catch {
      syncSettings.status = "error";
      syncSettings.progress = "";
      syncSettings.error = "The latest Garmin snapshot could not be refreshed.";
      saveSyncSettings();
      renderSyncStatus();
      showToast("Refresh missed. Your last good Garmin data is still here.");
    }
  }

  function applyHotfix() {
    document.querySelectorAll("[data-app-version]").forEach((element) => {
      element.textContent = `v${HOTFIX_VERSION}`;
      element.setAttribute("aria-label", `Fitness HQ version ${HOTFIX_VERSION}`);
    });

    const existing = document.getElementById("dashboardRefresh");
    if (!existing || existing.dataset.hotfixVersion === HOTFIX_VERSION) return;

    const replacement = existing.cloneNode(true);
    replacement.dataset.hotfixVersion = HOTFIX_VERSION;
    existing.replaceWith(replacement);
    replacement.addEventListener("click", refreshLatestSnapshotAndCoaching);
  }

  if (document.readyState === "complete") window.setTimeout(applyHotfix, 0);
  else window.addEventListener("load", applyHotfix, { once: true });
})();
