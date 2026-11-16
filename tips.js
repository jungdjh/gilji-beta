// 보완법 tips for the daily card. Tips are advice, not scoring: each site tip is picked by a fact
// the engine already reported (weak side, 오행 balance, 살, facing), and general 양택 tips and
// seasonal tips fill out the rotation. Same home + same date = same tip.
window.PUNGSU_TIPS = (function () {
  const DIR = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];
  const dir = (b) => DIR[Math.floor((((b % 360) + 360) % 360) / 45 + 0.5 - 1e-9) % 8];  // 337.5 → 북서
  const OH = {
    wood: { name: "목(木)", plain: "초록 식물과 나무 소품을 더해요", how: "초록 식물과 원목 가구, 세로로 긴 소품" },
    fire: { name: "화(火)", plain: "따뜻한 색을 더해요", how: "따뜻한 색 조명, 붉은 계열 쿠션이나 그림 한 점" },
    earth: { name: "토(土)", plain: "흙빛 소품을 더해요", how: "베이지·황토색 패브릭, 도자기와 낮고 넓은 가구" },
    metal: { name: "금(金)", plain: "흰색과 금속 소품을 더해요", how: "흰 벽과 둥근 금속 소품, 깔끔한 수납" },
    water: { name: "수(水)", plain: "짙은 색과 유리 소품을 더해요", how: "남색이나 짙은 색 포인트, 유리 화병과 물결무늬" },
  };
  const ORDER = ["wood", "fire", "earth", "metal", "water"];

  function siteTips(r) {
    const c = r.score.components;
    const f = (k) => c[k].facts;
    const facing = r.site.facing_deg;
    const left = dir(facing - 90), right = dir(facing + 90), back = dir(facing + 180);
    const out = [];
    const en = f("enclosure");
    if (en.weak_side === "cheongryong") {
      out.push({ id: "weak_cr", tag: "가구", title: `${left}쪽을 높여 주세요`,
        body: `이 집은 왼쪽(현관에서 밖을 볼 때, ${left}쪽) 땅이 낮아요. 그쪽 창가나 벽에 키 큰 화분이나 높은 책장을 두면 양쪽이 균형을 찾아요.` });
    } else if (en.weak_side === "baekho") {
      out.push({ id: "weak_bh", tag: "가구", title: `${right}쪽을 높여 주세요`,
        body: `이 집은 오른쪽(현관에서 밖을 볼 때, ${right}쪽) 땅이 낮아요. 그쪽에 키 큰 화분이나 높은 수납장을 두면 양쪽이 균형을 찾아요.` });
    } else if (c.enclosure.score <= 40) {
      out.push({ id: "open_sides", tag: "가구", title: "양옆을 감싸 주세요",
        body: "좌우가 모두 트인 집이에요. 거실 소파 양옆에 높이가 비슷한 수납장이나 화분을 짝 맞춰 두면 감싸 안는 느낌이 생겨요." });
    }
    if (c.hyeonmu.score < 70) {
      out.push({ id: "back", tag: "침실", title: "등 뒤를 든든하게",
        body: "집 뒤를 받쳐 주는 땅이 약해요. 침대 머리와 소파 등은 벽에 붙이고, 뒤가 창이라면 두꺼운 커튼을 달아 주세요." });
    }
    if (f("jujak").front_overbearing) {
      out.push({ id: "front_high", tag: "거실", title: "앞쪽은 낮고 밝게",
        body: `앞의 산이 뒤의 땅보다 높은 집이에요. 현관과 거실 앞쪽에는 낮은 가구와 밝은 조명을 두고, 큰 가구는 안쪽(${back}쪽)으로 옮겨 주세요.` });
    }
    const jp = f("jangpung");
    if (jp.wind_open || c.jangpung.score <= 80) {   // rules v0.2: the cold wind is regional
      const w = jp.wind_from_deg != null ? dir(jp.wind_from_deg) : "북서";
      out.push({ id: "wind", tag: "창", title: "바람길을 다스려요",
        body: jp.wind_open
          ? `${w}쪽이 열려 있어 찬바람을 많이 받는 집이에요. ${w}쪽 창에 두꺼운 커튼을 달고, 겨울에는 창틈을 막아 주세요.`
          : "사방이 낮아 바람을 고루 받는 집이에요. 바람이 드는 쪽 창에 두꺼운 커튼을 달고, 겨울에는 창틈을 막아 주세요." });
    }
    const d = f("deuksu");
    if (d.bend === "hwanpo") {
      out.push({ id: "hwanpo", tag: "창", title: "물길 쪽 창을 열어 두세요",
        body: `${d.bend_river}이 집 쪽으로 감싸 흘러요. 풍수에서는 이런 물을 반겨요. 물길 쪽 창은 가리지 말고 깨끗하게 두세요.` });
    } else if (d.bend === "straight") {
      out.push({ id: "straight", tag: "현관", title: "흐르는 기운을 붙잡아요",
        body: "물이 곧게 흘러 지나가는 집이에요. 풍수에서는 이럴 때 현관 안쪽에 둥근 화분이나 둥근 러그를 두어, 들어온 좋은 기운이 머물게 한다고 해요." });
    }
    r.sal.forEach((s) => {
      if (s.id === "bangung") {
        out.push({ id: "bangung", tag: "창", title: "물이 등진 쪽을 채워요",
          body: `${s.evidence.river}이 집 바깥쪽으로 굽어 흘러요. 물 쪽 창가에 화분을 두고, 마당이 있다면 나무나 울타리로 물 쪽을 채워 주세요.` });
      } else if (s.id === "overpass") {
        out.push({ id: "overpass", tag: "창", title: "고가 쪽을 부드럽게 가려요",
          body: `${s.evidence.road}가 가까이 지나가요. 그쪽 창에는 두꺼운 커튼이나 블라인드를, 창가에는 키 큰 화분을 두어 시선과 소음을 가려 주세요.` });
      }
    });
    const jw = f("jwahyang");   // rules v0.2: winter sun at the site, not the door bearing
    if (jw.sun_lost_h >= 0.5) {
      out.push({ id: "light", tag: "조명", title: "집 안을 밝게",
        body: `한겨울에 해가 ${jw.sun_lost_h < 2 ? Math.round(jw.sun_lost_h * 12) * 5 + "분" : jw.sun_lost_h.toFixed(1) + "시간"}쯤 산에 가리는 집이에요. 해가 덜 드는 방에는 따뜻한 색 조명을 더해 주세요.` });
    } else if (!jw.faces_sun && jw.off_south_deg >= 45) {
      out.push({ id: "light", tag: "조명", title: "남쪽 볕을 들여요",
        body: "현관이 남쪽을 보지 않는 집이에요. 남쪽으로 난 창은 가리지 말고, 낮에는 커튼을 활짝 열어 볕을 들여 주세요." });
    }
    const oh = r.ohaeng;
    const missing = ORDER.filter((k) => oh[k] === 0);
    if (missing.length) {
      const m = missing[0];
      out.push({ id: "oh_" + m, tag: "색", title: OH[m].plain,
        body: `풍수에서는 주변 봉우리의 모양으로 다섯 기운(오행)을 읽어요. 이 집 주변에는 ${OH[m].name} 모양의 봉우리가 보이지 않아서, ${OH[m].how} 같은 것으로 채워 보라고 해요.` });
    }
    return out;
  }

  const GENERAL = [
    { id: "jeonchak", tag: "현관", title: "현관은 아담하게, 안은 넓게",
      body: "들어오는 곳은 아담하고 안으로 들어설수록 넓어지는 집을 풍수에서는 좋게 봐요. 현관에는 큰 가구를 두지 말고 신발은 늘 정리해 두세요." },
    { id: "mirror", tag: "현관", title: "현관 정면에 거울을 두지 마세요",
      body: "문을 열자마자 보이는 거울은 들어오는 기운을 되돌려 보낸다고 해요. 거울은 현관 옆벽에 두는 편이 좋아요." },
    { id: "bed", tag: "침실", title: "침대는 문과 일직선을 피해요",
      body: "방문에서 곧장 침대 발치가 보이면 편히 쉬기 어려워요. 문이 비스듬히 보이는 자리에 침대를 두세요." },
    { id: "kitchen", tag: "주방", title: "가스레인지와 싱크대는 마주 보지 않게",
      body: "불과 물이 정면으로 마주 보는 배치예요. 마주 본다면 사이에 나무 도마나 초록 식물을 두어 부드럽게 이어 주세요." },
    { id: "corner", tag: "거실", title: "뾰족한 모서리를 돌려 주세요",
      body: "소파나 침대를 향한 날카로운 모서리는 긴장을 만들어요. 둥근 가구를 쓰거나 모서리 앞에 화분을 두세요." },
    { id: "door_light", tag: "현관", title: "현관은 밝게",
      body: "기운이 들어오는 첫 자리예요. 현관 조명이 어둡다면 따뜻한 색 전구로 바꿔 보세요." },
  ];

  const SEASON = [
    { months: [3, 4, 5], id: "spring", tag: "환기", title: "봄에는 동남쪽 창을 열어요",
      body: "새 기운이 도는 계절이에요. 아침에 동남쪽 창을 열어 묵은 공기를 내보내 주세요." },
    { months: [6, 7, 8], id: "summer", tag: "습기", title: "여름엔 물기를 말려요",
      body: "습기가 고이면 기운도 무거워져요. 욕실과 현관의 물기를 자주 닦고 바람이 통하게 해 주세요." },
    { months: [9, 10, 11], id: "autumn", tag: "패브릭", title: "가을엔 따뜻한 색을 더해요",
      body: "공기가 마르고 서늘해지는 때예요. 쿠션과 러그를 황토·베이지 같은 따뜻한 색으로 바꾸고 식물에 물을 챙겨 주세요." },
    { months: [12, 1, 2], id: "winter", tag: "보온", title: "겨울엔 서북쪽 틈을 막아요",
      body: "찬 바람은 서북에서 들어와요. 서북쪽 창의 틈을 막고 두꺼운 커튼을 달아 주세요." },
  ];

  // approximate dates of the 24 solar terms (they move by a day or so between years)
  const JEOLGI = [[1, 5, "소한"], [1, 20, "대한"], [2, 4, "입춘"], [2, 19, "우수"], [3, 5, "경칩"], [3, 20, "춘분"],
    [4, 4, "청명"], [4, 20, "곡우"], [5, 5, "입하"], [5, 21, "소만"], [6, 5, "망종"], [6, 21, "하지"],
    [7, 7, "소서"], [7, 22, "대서"], [8, 7, "입추"], [8, 23, "처서"], [9, 7, "백로"], [9, 22, "추분"],
    [10, 8, "한로"], [10, 23, "상강"], [11, 7, "입동"], [11, 22, "소설"], [12, 7, "대설"], [12, 21, "동지"]];
  function jeolgi(date) {
    const m = date.getMonth() + 1, d = date.getDate();
    let name = "동지";
    JEOLGI.forEach(([jm, jd, n]) => { if (m > jm || (m === jm && d >= jd)) name = n; });
    return name;
  }

  function pool(r, date) {
    const m = date.getMonth() + 1;
    const site = siteTips(r);
    // site tips come up twice as often as general ones: they are what makes the card "this home's"
    return [...site, ...site, ...GENERAL, ...SEASON.filter((s) => s.months.includes(m))];
  }
  function hash(s) { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; }
  // siteOnly: draw only from tips tied to this site's reading (no general interior or seasonal tips)
  function daily(r, date, opts = {}) {
    const p = opts.siteOnly && siteTips(r).length ? siteTips(r) : pool(r, date);
    const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5);
    return p[(day + hash(r.report_id)) % p.length];
  }

  return { siteTips, daily, jeolgi };
})();
