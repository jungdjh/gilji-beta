// 한국어 / ENG toggle (owner 2026-11-15: family members often read English better).
// Load this before every other script. Strings live next to the code that uses them as
// {ko, en} pairs; t() picks the current language. (Not named L: Leaflet owns window.L.)
//   t({ko: "보기", en: "Go"})  -> "Go" in English mode
//   t("보기")                   -> looks the Korean string up in WORDS, else returns it as is
//   place("북악산")             -> "Bugaksan" in English mode (mountain, river and road names)
// Default Korean. ?lang=en in the URL wins once, then the choice is kept in localStorage "gilji.lang".
(function () {
  const KEY = "gilji.lang";
  const ok = (v) => v === "ko" || v === "en";
  function initial() {
    const q = new URLSearchParams(location.search).get("lang");
    if (ok(q)) { try { localStorage.setItem(KEY, q); } catch (_) {} return q; }
    try { const v = localStorage.getItem(KEY); if (ok(v)) return v; } catch (_) {}
    return "ko";
  }
  window.GILJI_LANG = initial();
  document.documentElement.lang = window.GILJI_LANG;

  const isEn = () => window.GILJI_LANG === "en";
  // a few loose Korean strings that are easier to look up than to pair in place
  const WORDS = {};
  function t(x) {
    if (x == null) return "";
    if (typeof x === "string") return isEn() && WORDS[x] ? WORDS[x] : x;
    return isEn() ? (x.en != null ? x.en : x.ko) : x.ko;
  }

  // names of hills, water and roads that appear in the sample reports (romanized)
  const PLACE = {
    북악산: "Bugaksan", 인왕산: "Inwangsan", 구진봉: "Gujinbong", 안산: "Ansan", 남산: "Namsan",
    대모산: "Daemosan", 구룡산: "Guryongsan", 봉제산: "Bongjesan", 용왕산: "Yongwangsan", 갈산: "Galsan",
    갈탄봉: "Galtanbong", 천장산: "Cheonjangsan", 개운산: "Gaeunsan",
    경회지: "Gyeonghoeji", 청계천: "Cheonggyecheon", 양재천: "Yangjaecheon", 안양천: "Anyangcheon",
    정릉천: "Jeongneungcheon", 화랑로: "Hwarang-ro", 북부간선도로: "Bukbu Expressway",
  };
  const place = (n) => (n && isEn() ? PLACE[n] || n : n);

  const listeners = [];
  function setLang(l) {
    if (!ok(l) || l === window.GILJI_LANG) return;
    window.GILJI_LANG = l;
    try { localStorage.setItem(KEY, l); } catch (_) {}
    document.documentElement.lang = l;
    // drop a ?lang= from the address so a reload keeps the choice just made
    const qs = new URLSearchParams(location.search);
    if (qs.has("lang")) {
      qs.delete("lang");
      history.replaceState(null, "", location.pathname + (qs.toString() ? "?" + qs : "") + location.hash);
    }
    listeners.forEach((f) => { try { f(l); } catch (e) { console.error(e); } });
  }

  window.GILJI_I18N = { t, place, isEn, setLang, words: WORDS, onLang: (f) => listeners.push(f) };
})();
