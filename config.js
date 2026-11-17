// Where the Gilji web service lives. On localhost the page uses the local service (http://127.0.0.1:8787).
window.GILJI_CONFIG = {
  // closed beta: every reading opens free for the testers, sample homes included (no paywall, no price)
  beta: true,
  api: /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? "" : "https://65-21-245-112.sslip.io",
};
