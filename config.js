// Where the Gilji web service lives. On localhost the page uses the local service (http://127.0.0.1:8787).
window.GILJI_CONFIG = {
  api: /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? "" : "https://65-21-245-112.sslip.io",
};
