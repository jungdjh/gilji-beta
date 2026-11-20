// Bakseed beta: look up a real US address and chat about a home, through the web service
// (api/server.py). The page still works without it (the nine sample places stay local).
// What a person types stays in this browser; the service geocodes it once (and, while typing, asks
// OpenStreetMap's Photon for address suggestions) and keeps only an
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
    facing_today: { ko: "오늘은 방향을 많이 바꾸셨어요. 내일 다시 해 주세요.", en: "You've changed the direction many times today. Please try again tomorrow." },
    offline: { ko: "박씨 서버에 닿지 못했어요. 조금 뒤에 다시 해 주세요.", en: "We couldn't reach the Bakseed server. Please try again in a little while." },
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
      <p>${T({ ko: "박씨는 지금 초대받은 분들만 쓰는 베타예요. 받으신 링크나 코드를 넣어 주세요.",
               en: "Bakseed is a beta for invited people only for now. Enter the link or code you received." })}</p>
      <form id="inv-form" class="search" style="margin:12px 0 0"><input id="inv" type="text" autocomplete="off" aria-label="${code}" placeholder="${code}">
      <button class="btn" type="submit">${T({ ko: "확인", en: "OK" })}</button></form>`, () => askInvite(then));
    $("inv").value = typed;
    $("inv").focus();
    $("inv-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      let v = $("inv").value.trim();
      const m = v.match(/[?&]invite=([^&#\s]+)/);   // a whole pasted link works too
      if (m) v = decodeURIComponent(m[1]);
      if (!v) return;
      const btn = $("inv-form").querySelector("button");
      btn.disabled = true;
      const before = keep.get("invite", "");
      keep.set("invite", v);
      let ok = true;
      try { await call("GET", "/api/invite"); } catch (err) { ok = err.code !== "invite"; }   // offline: keep it and move on
      btn.disabled = false;
      if (!ok) {
        keep.set("invite", before);
        let er = $("inv-err");
        if (!er) { er = document.createElement("p"); er.id = "inv-err"; er.className = "err"; $("inv-form").after(er); }
        er.textContent = T({ ko: "이 코드는 맞지 않아요. 받으신 링크의 invite= 뒤 글자를 확인해 주세요.",
                             en: "That code doesn't work. Check the letters after invite= in your link." });
        $("inv").focus();
        return;
      }
      window.giljiSheet(`<div class="inv-ok"><div class="inv-check">✓</div>
        <h3>${T({ ko: "확인됐어요! 환영해요.", en: "You're in. Welcome!" })}</h3>
        <p>${T({ ko: then ? "하던 걸 이어서 할게요." : "이제 집 주소를 넣고 '보기'를 눌러 보세요.",
                 en: then ? "Picking up where you left off." : "Now enter a home address and tap 'Go'." })}</p>
        <button class="btn" id="inv-go" type="button">${T({ ko: "시작하기", en: "Start" })}</button></div>`);
      $("inv-go").addEventListener("click", () => {
        window.giljiCloseSheet();
        if (then) then(); else { const a = $("q"); if (a) a.focus(); }
      });
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

  // the door direction set by the person: the server scores it again as its own home id
  async function setFacing(id, deg, source) {
    const r = await call("POST", `/api/homes/${id}/facing`, { deg: Math.round(deg) % 360, source });
    remember(r.id, { report: r.report, map: r.map, card: r.card, label: (homes[id] && homes[id].label) || "" });
    return r.id;
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
      <p>${T({ ko: "터주가 땅을 다시 읽고 있어요. 1분쯤 걸릴 수 있어요. 이 화면을 열어 두세요.", en: "Teoju is reading the land again. It can take about a minute. Keep this screen open." })}</p>`, writing);
    writing();
    try {
      // a new reading is written in the background; ask again every few seconds until it is ready.
      // a dropped connection (the phone gave up, or slept for a moment) is retried, not shown as a failure.
      let rd = null, misses = 0;
      for (let tries = 0; tries < 60 && !rd; tries++) {
        try {
          const r = await call("POST", `/api/homes/${id}/reading`, { lang: lg });
          misses = 0;
          if (r.status !== "working") rd = r;
        } catch (err) {
          if (err.code !== "offline" || ++misses > 3) throw err;
        }
        if (!rd) await new Promise((ok) => setTimeout(ok, 3000));
      }
      if (!rd) throw new ApiError("offline");
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
    ko: ["이 집 별점이 왜 이렇게 나왔어요?", "가장 신경 써야 할 점은 뭐예요?", "집 안에서 할 수 있는 보완법이 있어요?"],
    en: ["Why did this home get these stars?", "What should I watch most?", "Is there anything I can do inside the home?"],
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
  // Teoju answers like Zillow's AI: one summary line, then short bullets with a bold label
  function fmt(text) {
    const out = []; let list = [];
    const flush = () => { if (list.length) { out.push(`<ul>${list.map((x) => `<li>${x}</li>`).join("")}</ul>`); list = []; } };
    esc(text).split(/\n/).forEach((line) => {
      const l = line.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
      const m = l.match(/^\s*(?:[-•·*]|\d+[.)])\s+(.*)$/);
      if (m) list.push(m[1]); else { flush(); if (l.trim()) out.push(`<p style="margin:0 0 4px">${l}</p>`); }
    });
    flush();
    return out.join("");
  }
  function renderChat(id, sugg) {
    const turns = chats[id] || [];
    $("chat-msgs").innerHTML = turns.map((t) => `<div class="q">${esc(t.q)}</div>` + (t.a == null
      ? `<div class="a wait">${T({ ko: "터주가 생각하는 중…", en: "Teoju is thinking…" })}</div>`
      : `<div class="a">${fmt(t.a)}${(t.facts || []).length ? `<div class="facts">${t.facts.map((f) => `<span><b>${esc(f.label)}</b> ${esc(f.value)}</span>`).join("")}</div>` : ""}</div>`)).join("");
    if (!turns.length && window.PUNGSU_CHARS) $("chat-msgs").innerHTML = `<div class="hi">${PUNGSU_CHARS.toad(64, { pose: "hello", cls: "pop" })}
      <div class="a">${T({ ko: "안녕하세요, 이 집 땅을 지키는 터주예요. 뒷산, 물길, 바람길처럼 이 집 땅에 대해 궁금한 걸 물어보세요.",
        en: "Hi, I'm Teoju, the guardian of this home's land. Ask me anything about its land: the hills behind, the water, the wind." })}</div></div>`;
    $("chat-msgs").scrollTop = $("chat-msgs").scrollHeight;   // newest message in view
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

  // address suggestions while typing (OpenStreetMap, through our server; nothing is kept)
  function bindSuggest() {
    const input = $("q"), form = $("search");
    if (!API || !input || !form) return;
    form.style.position = "relative"; form.style.zIndex = "16";   // above the cards below it
    const box = document.createElement("ul");
    box.id = "sugg"; box.setAttribute("role", "listbox"); box.hidden = true;
    form.appendChild(box);
    input.setAttribute("aria-autocomplete", "list"); input.setAttribute("aria-controls", "sugg");
    let timer = 0, seq = 0, items = [], on = -1;
    const hide = () => { box.hidden = true; items = []; on = -1; };
    const pick = (line) => { input.value = line; hide(); form.requestSubmit(); };
    const paint = () => {
      box.innerHTML = "";
      items.forEach((line, i) => {
        const li = document.createElement("li");
        li.setAttribute("role", "option"); li.className = i === on ? "on" : "";
        const c = line.indexOf(",");
        li.innerHTML = "<b></b><span></span>";
        li.firstChild.textContent = c > 0 ? line.slice(0, c) : line;
        li.lastChild.textContent = c > 0 ? line.slice(c + 1).trim() : "";
        li.addEventListener("pointerdown", (e) => { e.preventDefault(); pick(line); });
        box.appendChild(li);
      });
      if (items.length) {           // credit the suggestion data (Geoapify's free plan asks for it)
        const c = document.createElement("li"); c.className = "credit"; c.setAttribute("aria-hidden", "true");
        c.textContent = "Powered by Geoapify · © OpenStreetMap"; box.appendChild(c);
      }
      box.hidden = !items.length;
    };
    input.addEventListener("input", () => {
      clearTimeout(timer);
      const q = input.value.trim();
      if (!/^\d+[A-Za-z]?\s+\S{2,}/.test(q)) { seq++; hide(); return; }
      timer = setTimeout(async () => {
        const my = ++seq;
        if (box.hidden) {              // the free suggestion service can take a few seconds: say so
          box.innerHTML = `<li class="credit">${T({ ko: "주소 찾는 중…", en: "Finding addresses…" })}</li>`;
          box.hidden = false;
        }
        let r;
        try { r = await call("GET", "/api/suggest?q=" + encodeURIComponent(q)); } catch (_) { if (my === seq) hide(); return; }
        if (my !== seq || input.value.trim() !== q) return;   // a newer letter was typed
        items = (r.items || []).filter((x) => x.toLowerCase() !== q.toLowerCase()); on = -1; paint();
      }, 280);
    });
    input.addEventListener("keydown", (e) => {
      if (box.hidden) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (e.key === "ArrowDown") on = on + 1 >= items.length ? -1 : on + 1;
        else on = on - 1 < -1 ? items.length - 1 : on - 1;
        paint();
      } else if (e.key === "Enter" && on >= 0) { e.preventDefault(); pick(items[on]); }
      else if (e.key === "Escape") hide();
    });
    input.addEventListener("blur", () => setTimeout(hide, 150));
    form.addEventListener("submit", () => { seq++; clearTimeout(timer); hide(); });
  }
  bindSuggest();

  window.GILJI = { api: API, lookup, placeholder, unlock, hasReading, chatCard, bindChat, setFacing, message: msg, isLive: (id) => !!homes[id], homes };
})();
