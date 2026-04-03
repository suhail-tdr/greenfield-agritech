/* =====================================================
   GreenField AgriTech — Honeypot Tracker
   Sends all visitor data to the real backend API
   ===================================================== */

(function HoneypotTracker() {

  // ── CONFIGURATION ──────────────────────────────────
  // ⚠️  REPLACE THIS with your actual Render/Railway URL after deploying!
  // Example: "https://greenfield-honeypot-backend.onrender.com"
  const BACKEND_URL = window.HONEYPOT_BACKEND || "https://greenfield-backend-8scu.onrender.com";

  // Also keep localStorage as fallback
  const HP_KEY = 'gf_threat_logs';
  const MAX_LOCAL = 200;

  // ── VISITOR FINGERPRINT ────────────────────────────
  function getVisitorInfo() {
    return {
      ts:        new Date().toISOString(),
      ts_local:  new Date().toLocaleString('en-IN'),
      url:       window.location.href,
      page:      window.location.pathname,
      ref:       document.referrer || 'Direct',
      ua:        navigator.userAgent,
      browser:   getBrowser(),
      os:        getOS(),
      screen:    `${screen.width}x${screen.height}`,
      lang:      navigator.language,
      tz:        Intl.DateTimeFormat().resolvedOptions().timeZone,
      touch:     navigator.maxTouchPoints > 0,
      online:    navigator.onLine,
    };
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
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

  // ── SEND TO BACKEND ────────────────────────────────
  function sendLog(event, extra = {}) {
    const payload = { event, ...getVisitorInfo(), ...extra };

    // 1. Send to real backend (fire-and-forget, silent)
    if (BACKEND_URL && !BACKEND_URL.includes('YOUR-BACKEND')) {
      fetch(`${BACKEND_URL}/api/log`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
        keepalive: true,   // ensures request completes even on page exit
      }).catch(() => {}); // silently ignore network errors
    }

    // 2. Also save to localStorage (same-device dashboard fallback)
    try {
      const logs = JSON.parse(localStorage.getItem(HP_KEY) || '[]');
      logs.unshift({ id: Date.now(), ...payload });
      if (logs.length > MAX_LOCAL) logs.length = MAX_LOCAL;
      localStorage.setItem(HP_KEY, JSON.stringify(logs));
    } catch(e) {}
  }

  // ── EVENTS TO LOG ──────────────────────────────────

  // Page visit
  sendLog('PAGE_VISIT');

  // Time on page (logged on exit)
  const arrivedAt = Date.now();
  window.addEventListener('beforeunload', () => {
    sendLog('PAGE_EXIT', {
      duration_secs: Math.round((Date.now() - arrivedAt) / 1000)
    });
  });

  // First human interaction (detects bots vs real users)
  document.addEventListener('mousemove', () => {
    sendLog('HUMAN_INTERACTION', { type: 'mouse_move' });
  }, { once: true });

  // First scroll
  window.addEventListener('scroll', () => {
    sendLog('HUMAN_INTERACTION', {
      type: 'scroll',
      depth: Math.round((window.scrollY / document.body.scrollHeight) * 100) + '%'
    });
  }, { once: true });

  // ── EXPOSE API ─────────────────────────────────────
  // Used by login.html to log attempts with username
  window.HP = {
    sendLog,
    BACKEND_URL,
  };

})();
