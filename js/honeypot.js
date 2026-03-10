/* =====================================================
   GreenField AgriTech — Honeypot Tracking System
   Silent visitor logging for threat intelligence
   ===================================================== */

(function HoneypotTracker() {

  const HP_KEY = 'gf_threat_logs';
  const MAX_LOGS = 500;

  // ── GATHER VISITOR FINGERPRINT ─────────────────────
  function getVisitorInfo() {
    return {
      ts: new Date().toISOString(),
      ts_local: new Date().toLocaleString('en-IN'),
      url: window.location.href,
      page: window.location.pathname,
      ref: document.referrer || 'Direct',
      ua: navigator.userAgent,
      browser: getBrowser(),
      os: getOS(),
      screen: `${screen.width}x${screen.height}`,
      lang: navigator.language,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      touch: navigator.maxTouchPoints > 0,
      online: navigator.onLine,
    };
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    return 'Other';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Other';
  }

  // ── SAVE LOG ENTRY ─────────────────────────────────
  function saveLog(event, extra = {}) {
    try {
      const logs = JSON.parse(localStorage.getItem(HP_KEY) || '[]');
      const entry = {
        id: Date.now(),
        event,
        ...getVisitorInfo(),
        ...extra,
      };
      logs.unshift(entry);
      if (logs.length > MAX_LOGS) logs.length = MAX_LOGS;
      localStorage.setItem(HP_KEY, JSON.stringify(logs));
    } catch(e) {}
  }

  // ── LOG PAGE VISIT ─────────────────────────────────
  saveLog('PAGE_VISIT');

  // ── LOG TIME ON PAGE ───────────────────────────────
  const arrivedAt = Date.now();
  window.addEventListener('beforeunload', () => {
    const secs = Math.round((Date.now() - arrivedAt) / 1000);
    saveLog('PAGE_EXIT', { duration_secs: secs });
  });

  // ── LOG MOUSE MOVEMENT (detect bots) ──────────────
  let mouseMoved = false;
  document.addEventListener('mousemove', () => {
    if (!mouseMoved) { mouseMoved = true; saveLog('HUMAN_INTERACTION', { type: 'mouse_move' }); }
  }, { once: true });

  // ── LOG SCROLL ─────────────────────────────────────
  let scrollLogged = false;
  window.addEventListener('scroll', () => {
    if (!scrollLogged) {
      scrollLogged = true;
      saveLog('HUMAN_INTERACTION', { type: 'scroll', depth: Math.round((window.scrollY / document.body.scrollHeight) * 100) + '%' });
    }
  });

  // ── EXPOSE TO WINDOW for login page ───────────────
  window.HP = { saveLog };

})();
