// Gilji beta: look up a real US address and chat about a home, through the web service
// (api/server.py). The page still works without it (the nine sample places stay local).
// What a person types stays in this browser; the service geocodes it once and keeps only an
// opaque id for the home. Settings: config.js sets window.GILJI_CONFIG = { api: "https://..." }.
(function () {
  const cfg = window.GILJI_CONFIG || {};
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const API = cfg.api || (local ? "http://127.0.0.1:8787" : null);
  const $ = (id) => document.getElementById(id);
  const I = window.GILJI_I18N;
  const T = I.t;
  const lang = () => window.GILJI_LANG;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const keep = {
    get(k, d) { try { const v = localStorage.getItem("gilji." + k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem("gilji." + k, JSON.stringify(v)); } catch (_) {} },
  };

  // an invite link looks like ...?invite=CODE; keep the code, then take it out of the address bar
  const qs = new URLSearchParams(location.search);
  if (qs.get("invite")) {
    keep.set("invite", qs.get("invite").trim());
    qs.delete("invite");
    history.replaceState(null, "", location.pathname + (qs.toString() ? "?" + qs : "") + location.hash);
  }

  const MSG = {
    not_found: { ko: "주소를 찾지 못했어요. 번지, 도시, 주(州)까지 넣어 주세요. 예: 1100 Congress Ave, Austin, TX",
                 en: "We couldn't find that address. Please include the house number, city and state. e.g. 1100 Congress Ave, Austin, TX" },
    not_covered: { ko: "지금은 캘리포니아와 텍사스 주소만 볼 수 있어요. 다른 주는 곧 열려요.",
                   en: "For now we can only read California and Texas addresses. Other states are coming soon." },
    homes_today: { ko: "오늘은 새 집을 다 보셨어요. 내일 다시 와 주세요. 이미 본 집은 언제든 다시 볼 수 있어요.",
                   en: "You've seen all the new homes for today. Please come back tomorrow. Homes you've already seen are always open." },
    questions_today: { ko: "오늘 질문을 다 쓰셨어요. 내일 다시 물어봐 주세요.", en: "You've used today's questions. Please ask again tomorrow." },
    budget: { ko: "이번 달 베타 사용량이 다 찼어요. 다음 달에 다시 열려요.", en: "This month's beta use is full. It opens again next month." },
    invite: { ko: "초대 코드가 필요해요.", en: "You need an invite code." },
    offline: { ko: "길지 서버에 닿지 못했어요. 조금 뒤에 다시 해 주세요.", en: "We couldn't reach the Gilji server. Please try again in a little while." },
    other: { ko: "잠시 문제가 생겼어요. 조금 뒤에 다시 해 주세요.", en: "Something went wrong. Please try again in a little while." },
  };
  const msg = (code) => T(MSG[code] || MSG.other);

  class ApiError extends Error { constructor(code) { super(code); this.code = code; } }

  async function call(method, path, body) {
    if (!API) throw new ApiError("offline");
    let res;
    try {
      res = await fetch(API + path, {
        method, headers: { "Content-Type": "application/json", "X-Invite": keep.get("invite", "") },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (_) { throw new ApiError("offline"); }
    let data = {};
    try { data = await res.json(); } catch (_) {}
    if (!res.ok) throw new ApiError((data.detail && data.detail.error) || "other");
    return data;
  }

  // "1100 CONGRESS AVE, AUSTIN, TX, 78701" -> "1100 Congress Ave, Austin, TX 78701"
  function pretty(m) {
    if (!m) return "";
    const parts = m.split(",").map((s) => s.trim());
    const zip = /^\d{5}/.test(parts[parts.length - 1]) ? parts.pop() : "";
    const st = parts.length > 1 ? parts.pop() : "";
    const words = parts.join(", ").toLowerCase().replace(/\b([a-z])/g, (c) => c.toUpperCase());
    return [words, [st, zip].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  }

  // live homes this browser has looked up (kept here only, so "내 집" and going back still work)
  const homes = keep.get("homes", {});
  function remember(id, h) {
    homes[id] = h;
    const ids = Object.keys(homes);
    if (ids.length > 12) delete homes[ids[0]];
    keep.set("homes", homes);
    install(id);
  }
  function install(id) {
    const h = homes[id];
    if (!h) return;
    window.PUNGSU_REPORTS[id] = h.report;
    (window.PUNGSU_MAP = window.PUNGSU_MAP || {})[id] = h.map || {};
    window.GILJI_LABEL[id] = h.label;
    // readings are kept per language; older saves had a single Korean "reading"
    if (h.reading && !h.readings) { h.readings = { ko: h.reading }; delete h.reading; }
    const rs = h.readings || {};
    if (rs.ko) window.PUNGSU_WRITER[id] = rs.ko;
    if (rs.en) (window.PUNGSU_WRITER_EN = window.PUNGSU_WRITER_EN || {})[id] = rs.en;
  }
  window.GILJI_LABEL = {};
  Object.keys(homes).forEach(install);

  // ---- the wait screen: the steps keep turning until the engine is done ----
  let spin = null;
  function startSteps(label) {
    $("reading-addr").textContent = label;
    window.giljiShow("reading");
    const lis = [...$("steps").children];
    let i = 0;
    lis.forEach((li) => (li.className = ""));
    const tick = () => { lis.forEach((li, j) => (li.className = j < i % (lis.length + 1) ? "done" : j === i % (lis.length + 1) ? "on" : "")); i++; };
    tick();
    spin = setInterval(tick, 1400);
    waitMsg = { ko: "처음 보는 집은 30초쯤 걸려요.", en: "A home we haven't seen before takes about 30 seconds." };
    $("reading-wait").textContent = T(waitMsg);
  }
  let waitMsg = null;
  function stopSteps() { clearInterval(spin); spin = null; waitMsg = null; }

  function fail(code) {
    stopSteps();
    window.giljiShow("home");
    if (code === "invite") { askInvite(); return; }
    window.giljiHint(MSG[code] || MSG.other, true);
  }

  function askInvite(then) {
    const typed = $("inv") ? $("inv").value : "";   // keep what was typed when the language changes
    const code = T({ ko: "초대 코드", en: "Invite code" });
    window.giljiSheet(`<h3>${T({ ko: "초대 코드를 넣어 주세요", en: "Enter your invite code" })}</h3>
      <p>${T({ ko: "길지는 지금 초대받은 분들만 쓰는 베타예요. 받으신 링크나 코드를 넣어 주세요.",
               en: "Gilji is a beta for invited people only for now. Enter the link or code you received." })}</p>
      <form id="inv-form" class="search" style="margin:12px 0 0"><input id="inv" type="text" autocomplete="off" aria-label="${code}" placeholder="${code}">
      <button class="btn" type="submit">${T({ ko: "확인", en: "OK" })}</button></form>`, () => askInvite(then));
    $("inv").value = typed;
    $("inv").focus();
    $("inv-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = $("inv").value.trim();
      if (!v) return;
      keep.set("invite", v);
      window.giljiCloseSheet();
      window.giljiHint({ ko: "고마워요. 주소를 다시 넣고 '보기'를 눌러 주세요.", en: "Thank you. Enter the address again and tap 'Go'." }, false);
      if (then) then();
    });
  }

  async function lookup(q) {
    $("hint").classList.remove("err");
    startSteps(q);
    let r;
    try { r = await call("POST", "/api/homes", { address: q }); } catch (e) { fail(e.code); return; }
    const label = pretty(r.matched) || q;
    $("reading-addr").textContent = label;
    const t0 = Date.now();
    while (r.status === "working") {
      if (Date.now() - t0 > 180000) { fail("other"); return; }
      await new Promise((ok) => setTimeout(ok, 1500));
      try { r = await call("GET", `/api/homes/${r.id}`); } catch (e) { fail(e.code); return; }
    }
    if (r.status !== "done" || !r.report) {
      try { r = await call("GET", `/api/homes/${r.id}`); } catch (e) { fail(e.code); return; }
      if (r.status !== "done") { fail("other"); return; }
    }
    remember(r.id, { report: r.report, map: r.map, card: r.card, label });
    stopSteps();
    window.giljiOpen(r.id);
  }

  // the free card's headline stands in until the full reading is opened
  function placeholder(id) {
    const h = homes[id] || {};
    const c = (h.card && (h.card[lang()] || h.card.ko)) || {};
    return { headline: c.headline || "",
      good: [T({ ko: "이 집의 좋은 점을 쉬운 말로 정리해 드려요.", en: "We sum up this home's good points in plain words." })],
      watch: [T({ ko: "아쉬운 점과 그 이유도 함께 알려 드려요.", en: "We also tell you its weak points, and why." })], sal: {},
      pungsu: { sides: "", ohaeng: "", giun: { wealth: "", health: "", harmony: "", career: "", stability: "" } } };
  }

  // the reading is written in the language that is on when it is opened; switching language later
  // asks once more for that language (the server caches each language, so it is paid for only once)
  const pending = new Set();   // id:lang being fetched, so a re-render never sends a second request
  async function unlock(id, done) {
    const lg = lang(), key = id + ":" + lg;
    if (pending.has(key)) return;
    pending.add(key);
    const writing = () => window.giljiSheet(`<h3>${T({ ko: "이 집만을 위한 해설을 쓰는 중이에요", en: "Writing a reading just for this home" })}</h3>
      <p>${T({ ko: "터주가 땅을 다시 읽고 있어요. 20초쯤 걸려요.", en: "Teoju is reading the land again. It takes about 20 seconds." })}</p>`, writing);
    writing();
    try {
      const rd = await call("POST", `/api/homes/${id}/reading`, { lang: lg });
      homes[id].readings = Object.assign(homes[id].readings || {}, { [lg]: rd });
      remember(id, homes[id]);
      window.giljiCloseSheet();
      done();
    } catch (e) {
      if (e.code === "invite") { window.giljiCloseSheet(); askInvite(() => unlock(id, done)); return; }
      const failed = () => {
        window.giljiSheet(`<h3>${T({ ko: "해설을 열지 못했어요", en: "We couldn't open the reading" })}</h3><p>${esc(msg(e.code))}</p>
          <button class="btn block" id="ok">${T({ ko: "닫기", en: "Close" })}</button>`, failed);
        $("ok").addEventListener("click", window.giljiCloseSheet);
      };
      failed();
    } finally { pending.delete(key); }
  }
  const hasReading = (id, lg) => !!((homes[id] || {}).readings || {})[lg];

  // ---- chat ----
  const STARTERS = {
    ko: ["이 집 점수가 왜 이렇게 나왔어요?", "가장 신경 써야 할 점은 뭐예요?", "집 안에서 할 수 있는 보완법이 있어요?"],
    en: ["Why did this home get this score?", "What should I watch most?", "Is there anything I can do inside the home?"],
  };
  const chats = {};   // id -> [{q, a}], this page visit only
  function chatCard(id) {
    if (!API) return "";
    return `<div class="card chat" id="chat">
      <h2>${T({ ko: "터주에게 물어보기", en: "Ask Teoju" })} <small>${T({ ko: "이 집 땅 이야기만 답해요", en: "Answers only about this home's land" })}</small></h2>
      <div class="msgs" id="chat-msgs"></div>
      <div class="sugg" id="chat-sugg"></div>
      <form class="search" id="chat-form" style="margin:10px 0 0">
        <input id="chat-q" type="text" maxlength="300" autocomplete="off" aria-label="${T({ ko: "질문", en: "Question" })}" placeholder="${T({ ko: "궁금한 점을 물어보세요", en: "Ask a question" })}">
        <button class="btn" type="submit">${T({ ko: "묻기", en: "Ask" })}</button></form>
      <p class="chat-note">${T({ ko: "지도와 지형 데이터로만 답해요. 주소는 보내지 않아요.", en: "Answers come from map and terrain data only. Your address is not sent." })}</p>
    </div>`;
  }
  function renderChat(id, sugg) {
    const turns = chats[id] || [];
    $("chat-msgs").innerHTML = turns.map((t) => `<div class="q">${esc(t.q)}</div>` + (t.a == null
      ? `<div class="a wait">${T({ ko: "터주가 생각하는 중…", en: "Teoju is thinking…" })}</div>`
      : `<div class="a">${esc(t.a).replace(/\n/g, "<br>")}${(t.facts || []).length ? `<div class="facts">${t.facts.map((f) => `<span><b>${esc(f.label)}</b> ${esc(f.value)}</span>`).join("")}</div>` : ""}</div>`)).join("");
    const list = sugg || (turns.length ? [] : STARTERS[lang()] || STARTERS.ko);
    $("chat-sugg").innerHTML = list.slice(0, 3).map((s) => `<button type="button" class="btn ghost small">${esc(s)}</button>`).join("");
  }
  function bindChat(id) {
    if (!API || !$("chat")) return;
    renderChat(id);
    const ask = async (q) => {
      q = q.trim();
      if (!q) return;
      const turns = (chats[id] = chats[id] || []);
      if (turns.some((t) => t.a == null)) return;
      const history = turns.filter((t) => t.a).map((t) => ({ q: t.q, a: t.a }));
      turns.push({ q, a: null });
      renderChat(id, []);
      $("chat-q").value = "";
      try {
        const r = await call("POST", `/api/homes/${id}/chat`, { question: q, lang: lang(), history });
        Object.assign(turns[turns.length - 1], { a: r.answer, facts: r.facts_used });
        renderChat(id, r.suggested_questions);
      } catch (e) {
        turns.pop();
        renderChat(id);
        if (e.code === "invite") { askInvite(() => ask(q)); return; }
        $("chat-msgs").insertAdjacentHTML("beforeend", `<div class="a err">${esc(msg(e.code))}</div>`);
      }
    };
    $("chat-form").addEventListener("submit", (e) => { e.preventDefault(); ask($("chat-q").value); });
    $("chat-sugg").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) ask(b.textContent); });
  }

  I.onLang(() => { if (waitMsg && $("reading-wait")) $("reading-wait").textContent = T(waitMsg); });

  window.GILJI = { api: API, lookup, placeholder, unlock, hasReading, chatCard, bindChat, isLive: (id) => !!homes[id], homes };
})();
