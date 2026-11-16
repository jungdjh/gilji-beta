// Gilji beta: look up a real US address and chat about a home, through the web service
// (api/server.py). The page still works without it (the nine sample places stay local).
// What a person types stays in this browser; the service geocodes it once and keeps only an
// opaque id for the home. Settings: config.js sets window.GILJI_CONFIG = { api: "https://..." }.
(function () {
  const cfg = window.GILJI_CONFIG || {};
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const API = cfg.api || (local ? "http://127.0.0.1:8787" : null);
  const $ = (id) => document.getElementById(id);
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
    not_found: "주소를 찾지 못했어요. 번지, 도시, 주(州)까지 넣어 주세요. 예: 1100 Congress Ave, Austin, TX",
    not_covered: "지금은 캘리포니아와 텍사스 주소만 볼 수 있어요. 다른 주는 곧 열려요.",
    homes_today: "오늘은 새 집을 다 보셨어요. 내일 다시 와 주세요. 이미 본 집은 언제든 다시 볼 수 있어요.",
    questions_today: "오늘 질문을 다 쓰셨어요. 내일 다시 물어봐 주세요.",
    budget: "이번 달 베타 사용량이 다 찼어요. 다음 달에 다시 열려요.",
    invite: "초대 코드가 필요해요.",
    offline: "길지 서버에 닿지 못했어요. 조금 뒤에 다시 해 주세요.",
    other: "잠시 문제가 생겼어요. 조금 뒤에 다시 해 주세요.",
  };

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
    if (h.reading) window.PUNGSU_WRITER[id] = h.reading;
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
    $("reading-wait").textContent = "처음 보는 집은 30초쯤 걸려요.";
  }
  function stopSteps() { clearInterval(spin); spin = null; }

  function fail(code) {
    stopSteps();
    window.giljiShow("home");
    if (code === "invite") { askInvite(); return; }
    $("hint").textContent = MSG[code] || MSG.other;
    $("hint").classList.add("err");
  }

  function askInvite(then) {
    window.giljiSheet(`<h3>초대 코드를 넣어 주세요</h3>
      <p>길지는 지금 초대받은 분들만 쓰는 베타예요. 받으신 링크나 코드를 넣어 주세요.</p>
      <form id="inv-form" class="search" style="margin:12px 0 0"><input id="inv" type="text" autocomplete="off" aria-label="초대 코드" placeholder="초대 코드">
      <button class="btn" type="submit">확인</button></form>`);
    $("inv").focus();
    $("inv-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = $("inv").value.trim();
      if (!v) return;
      keep.set("invite", v);
      window.giljiCloseSheet();
      $("hint").textContent = "고마워요. 주소를 다시 넣고 '보기'를 눌러 주세요.";
      $("hint").classList.remove("err");
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
    const c = (h.card && h.card.ko) || {};
    return { headline: c.headline || "", good: ["이 집의 좋은 점을 쉬운 말로 정리해 드려요."],
      watch: ["아쉬운 점과 그 이유도 함께 알려 드려요."], sal: {},
      pungsu: { sides: "", ohaeng: "", giun: { wealth: "", health: "", harmony: "", career: "", stability: "" } } };
  }

  async function unlock(id, done) {
    window.giljiSheet(`<h3>이 집만을 위한 해설을 쓰는 중이에요</h3><p>터주가 땅을 다시 읽고 있어요. 20초쯤 걸려요.</p>`);
    try {
      const rd = await call("POST", `/api/homes/${id}/reading`, { lang: "ko" });
      homes[id].reading = rd;
      remember(id, homes[id]);
      window.giljiCloseSheet();
      done();
    } catch (e) {
      if (e.code === "invite") { window.giljiCloseSheet(); askInvite(() => unlock(id, done)); return; }
      window.giljiSheet(`<h3>해설을 열지 못했어요</h3><p>${esc(MSG[e.code] || MSG.other)}</p><button class="btn block" id="ok">닫기</button>`);
      $("ok").addEventListener("click", window.giljiCloseSheet);
    }
  }

  // ---- chat ----
  const STARTERS = ["이 집 점수가 왜 이렇게 나왔어요?", "가장 신경 써야 할 점은 뭐예요?", "집 안에서 할 수 있는 보완법이 있어요?"];
  const chats = {};   // id -> [{q, a}], this page visit only
  function chatCard(id) {
    if (!API) return "";
    return `<div class="card chat" id="chat">
      <h2>터주에게 물어보기 <small>이 집 땅 이야기만 답해요</small></h2>
      <div class="msgs" id="chat-msgs"></div>
      <div class="sugg" id="chat-sugg"></div>
      <form class="search" id="chat-form" style="margin:10px 0 0">
        <input id="chat-q" type="text" maxlength="300" autocomplete="off" aria-label="질문" placeholder="궁금한 점을 물어보세요">
        <button class="btn" type="submit">묻기</button></form>
      <p class="chat-note">지도와 지형 데이터로만 답해요. 주소는 보내지 않아요.</p>
    </div>`;
  }
  function renderChat(id, sugg) {
    const turns = chats[id] || [];
    $("chat-msgs").innerHTML = turns.map((t) => `<div class="q">${esc(t.q)}</div>` + (t.a == null
      ? `<div class="a wait">터주가 생각하는 중…</div>`
      : `<div class="a">${esc(t.a).replace(/\n/g, "<br>")}${(t.facts || []).length ? `<div class="facts">${t.facts.map((f) => `<span><b>${esc(f.label)}</b> ${esc(f.value)}</span>`).join("")}</div>` : ""}</div>`)).join("");
    const list = sugg || (turns.length ? [] : STARTERS);
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
        const r = await call("POST", `/api/homes/${id}/chat`, { question: q, lang: "ko", history });
        Object.assign(turns[turns.length - 1], { a: r.answer, facts: r.facts_used });
        renderChat(id, r.suggested_questions);
      } catch (e) {
        turns.pop();
        renderChat(id);
        if (e.code === "invite") { askInvite(() => ask(q)); return; }
        $("chat-msgs").insertAdjacentHTML("beforeend", `<div class="a err">${esc(MSG[e.code] || MSG.other)}</div>`);
      }
    };
    $("chat-form").addEventListener("submit", (e) => { e.preventDefault(); ask($("chat-q").value); });
    $("chat-sugg").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) ask(b.textContent); });
  }

  window.GILJI = { api: API, lookup, placeholder, unlock, chatCard, bindChat, isLive: (id) => !!homes[id], homes };
})();
