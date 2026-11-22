// 보완법 tips for the daily card. Tips are advice, not scoring: each site tip is picked by a fact
// the engine already reported (weak side, 오행 balance, 살, facing), and general 양택 tips and
// seasonal tips fill out the rotation. Same home + same date = same tip.
// Korean and English (i18n.js): every text is built in the language that is on when it is asked for.
window.PUNGSU_TIPS = (function () {
  const I = window.GILJI_I18N;
  const en = () => I && I.isEn();
  const tr = (ko, eng) => (en() ? eng : ko);
  const place = (n) => (I ? I.place(n) : n);
  const DIR = { ko: ["북", "북동", "동", "남동", "남", "남서", "서", "북서"],
                en: ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"] };
  const dir = (b) => DIR[en() ? "en" : "ko"][Math.floor((((b % 360) + 360) % 360) / 45 + 0.5 - 1e-9) % 8];  // 337.5 → 북서
  const TAG = { 가구: "Furniture", 침실: "Bedroom", 거실: "Living room", 창: "Windows", 현관: "Entry", 조명: "Lighting",
                색: "Color", 주방: "Kitchen", 환기: "Fresh air", 습기: "Damp", 패브릭: "Fabrics", 보온: "Warmth" };
  const tag = (k) => (en() ? TAG[k] || k : k);
  const OH = {
    wood: { name: ["목(木)", "wood (木)"], plain: ["초록 식물과 나무 소품을 더해요", "Add green plants and wood"],
            how: ["초록 식물과 원목 가구, 세로로 긴 소품", "green plants, solid-wood furniture and tall, upright pieces"] },
    fire: { name: ["화(火)", "fire (火)"], plain: ["따뜻한 색을 더해요", "Add warm colors"],
            how: ["따뜻한 색 조명, 붉은 계열 쿠션이나 그림 한 점", "warm-colored lights, a red-toned cushion or a painting"] },
    earth: { name: ["토(土)", "earth (土)"], plain: ["흙빛 소품을 더해요", "Add earthy pieces"],
             how: ["베이지·황토색 패브릭, 도자기와 낮고 넓은 가구", "beige or ochre fabrics, pottery and low, wide furniture"] },
    metal: { name: ["금(金)", "metal (金)"], plain: ["흰색과 금속 소품을 더해요", "Add white and metal"],
             how: ["흰 벽과 둥근 금속 소품, 깔끔한 수납", "white walls, round metal pieces and tidy storage"] },
    water: { name: ["수(水)", "water (水)"], plain: ["짙은 색과 유리 소품을 더해요", "Add dark colors and glass"],
             how: ["남색이나 짙은 색 포인트, 유리 화병과 물결무늬", "navy or dark accents, glass vases and wave patterns"] },
  };
  const oh = (m, k) => OH[m][k][en() ? 1 : 0];
  // Opened fix card (owner Nov 21: "explain why this helps and how it helps"): the 풍수 reason in plain words,
  // then 2–3 concrete steps. Advice only, never a promise about money, health or luck.
  const DETAIL = {
    weak_cr: { why: ["풍수에서는 집 양옆의 땅이 두 팔처럼 집을 감싸 줄 때 기운이 흩어지지 않고 머문다고 봐요. 한쪽이 낮으면 그쪽으로 기운이 샌다고 해서, 집 안에서 그쪽을 높여 균형을 맞춰요.",
                     "Feng shui sees the land on both sides as two arms that hold a home, so good energy stays instead of drifting off. When one side is low, energy is said to leak out that way, so you raise that side indoors to even things out."],
                how: [["그쪽 벽이나 창가에 키 큰 화분, 높은 책장이나 수납장을 두세요.", "소파 등받이보다 높으면 좋아요.", "가볍고 흔들리는 것보다 묵직하고 단단한 것이 좋아요."],
                      ["Put a tall plant, a high bookcase or a cabinet by that wall or window.", "Taller than the back of the sofa is best.", "Solid, heavy pieces work better than light, wobbly ones."]] },
    open_sides: { why: ["풍수에서는 양옆의 땅이 집을 감싸 줘야 기운이 모인다고 봐요. 양쪽이 모두 트였다면, 집 안에서 짝을 맞춘 가구로 '감싸 안는' 모양을 만들어 줘요.",
                        "Feng shui says energy gathers when the land on both sides wraps around a home. When both sides are open, a matching pair of pieces indoors recreates that hug."],
                  how: [["거실 소파 양옆에 높이가 비슷한 화분이나 수납장을 한 쌍씩 두세요.", "침대 양옆에도 같은 협탁 두 개를 두면 좋아요.", "양쪽 높이와 크기를 비슷하게 맞추는 것이 핵심이에요."],
                        ["Put a matching pair of plants or cabinets, about the same height, on each side of the sofa.", "Two matching nightstands on both sides of the bed help too.", "The key is that both sides are about the same height and size."]] },
    back: { why: ["풍수에서는 집 뒤의 높은 땅(현무)이 의자 등받이처럼 집을 받쳐 준다고 봐요. 뒤가 약하면 집 안에서 '등 뒤'를 든든하게 만들어 마음 편히 쉬게 해요.",
                  "Feng shui sees the high land behind a home (hyeonmu) as the back of a chair. When it's weak, you build that support indoors so you can rest easy."],
            how: [["침대 머리와 소파 등은 창이 아닌 벽에 붙이세요.", "뒤가 창이라면 두꺼운 커튼을 달아 주세요.", "책상에 앉을 때도 등 뒤에 벽이 있는 자리가 좋아요."],
                  ["Put the head of the bed and the back of the sofa against a wall, not a window.", "If a window is behind, hang thick curtains.", "At a desk, a spot with a wall behind you is best."]] },
    front_high: { why: ["풍수에서는 앞의 산(손님)이 뒤의 산(주인)보다 높으면 손님이 주인을 누른다고 봐요. 집 안 앞쪽을 낮고 밝게, 뒤쪽을 든든하게 두어 순서를 바로잡아요.",
                        "Feng shui calls the hill in front the guest and the hill behind the host. When the guest stands taller, it's said to press on the home, so you keep the front low and bright and the back solid."],
                  how: [["현관과 거실 앞쪽에는 낮은 가구를 두세요.", "앞쪽에 밝은 조명을 더해 주세요.", "큰 장이나 책장은 집 안쪽 벽으로 옮겨 주세요."],
                        ["Keep low furniture at the entry and the front of the living room.", "Add bright lights at the front.", "Move tall wardrobes and bookcases to the inner walls."]] },
    wind: { why: ["풍수(風水)라는 이름처럼, 바람은 기운을 흩고 물은 기운을 모은다고 봐요. 찬바람이 드는 쪽을 막아 주면 집 안의 따뜻한 기운이 머물러요.",
                  "As the name feng shui (wind and water) says, wind scatters energy and water gathers it. Blocking the side where cold wind comes in helps the home's warmth stay."],
            how: [["바람이 드는 쪽 창에 두꺼운 커튼을 다세요.", "겨울에는 창틈과 문틈에 문풍지를 붙이세요.", "그쪽 창가에 키 큰 화분을 두면 바람막이가 돼요."],
                  ["Hang thick curtains on the windows on the windy side.", "In winter, seal window and door gaps with weather stripping.", "A tall plant by that window works as a windbreak."]] },
    hwanpo: { why: ["풍수에서는 집 쪽으로 감싸 흐르는 물을 가장 반겨요. 물이 기운을 모아 집에 머물게 한다고 봐서, 그쪽을 막지 않고 열어 둬요.",
                    "Feng shui welcomes water that curves toward a home most of all. Water is said to gather energy and hold it near the home, so you keep that side open."],
              how: [["물길 쪽 창은 큰 가구로 가리지 마세요.", "그쪽 창은 깨끗하게 닦아 두세요.", "물 쪽을 바라보는 자리에 의자 하나를 두면 좋아요."],
                    ["Don't block the water-side windows with big furniture.", "Keep those windows clean.", "A chair that looks out toward the water is a nice touch."]] },
    straight: { why: ["풍수에서는 곧게 흘러 지나가는 물은 기운을 머물게 하지 못하고 데려간다고 봐요. 들어온 기운이 머물도록 현관 안쪽에 둥근 것을 두어 흐름을 부드럽게 돌려요.",
                      "Feng shui says water that runs straight past carries energy away instead of letting it stay. Something round just inside the door softens the flow so energy settles."],
                how: [["현관 안쪽에 둥근 러그나 둥근 화분을 두세요.", "현관에서 뒷문이나 큰 창이 일직선으로 보이면 그 사이에 화분이나 가리개를 두세요.", "현관은 밝고 깔끔하게 정리해 두세요."],
                      ["Put a round rug or a round pot just inside the door.", "If you can see straight from the front door to a back door or big window, put a plant or screen in between.", "Keep the entry bright and tidy."]] },
    bangung: { why: ["풍수에서는 집 바깥쪽으로 굽어 흐르는 물을 '등 돌린 물'이라고 해서, 기운이 집에서 멀어진다고 봐요. 물 쪽을 초록으로 채워 기운을 붙잡아요.",
                     "Feng shui calls water that bends away from a home 'water with its back turned', and says it draws energy away. Filling the water side with green helps hold it."],
               how: [["물 쪽 창가에 화분을 줄지어 두세요.", "마당이 있다면 물 쪽에 나무를 심거나 울타리를 두세요.", "그쪽 창에는 밝은 색 커튼이 좋아요."],
                     ["Line up plants on the windowsills on the water side.", "If you have a yard, plant trees or put up a fence on the water side.", "Light-colored curtains suit those windows."]] },
    overpass: { why: ["풍수에서는 크고 빠른 길이나 고가가 날카로운 기운을 보낸다고 봐요. 그쪽을 부드럽게 가려 주면 시선과 소음도 줄고 집 안이 차분해져요.",
                      "Feng shui says big, fast roads and overpasses send sharp energy at a home. Softly screening that side also cuts the view and the noise, so the home feels calmer."],
                how: [["그쪽 창에 두꺼운 커튼이나 블라인드를 다세요.", "창가에 키 큰 화분을 두세요.", "침실은 되도록 반대쪽 방을 쓰세요."],
                      ["Use thick curtains or blinds on that side's windows.", "Put tall plants by those windows.", "If you can, use a bedroom on the other side."]] },
    light: { why: ["풍수에서는 햇빛을 집에 생기를 주는 양(陽)의 기운으로 봐요. 해가 덜 드는 집은 빛을 더하거나 들여서 그 기운을 채워요.",
                   "Feng shui sees sunlight as yang energy that brings a home to life. Where the sun is short, you let more in or add light to make up for it."],
             how: [["해가 덜 드는 방에 따뜻한 색 조명(2700K쯤)을 더하세요.", "낮에는 남쪽 창의 커튼을 활짝 여세요.", "창가는 비워 두고 밝은 색 패브릭을 써 보세요."],
                   ["Add warm-colored lights (around 2700K) in rooms that get less sun.", "Open the south-facing curtains wide during the day.", "Keep windowsills clear and try light-colored fabrics."]] },
  };
  const OH_DETAIL = {
    why: (m) => tr(`풍수에서는 주변 봉우리 모양으로 다섯 기운(목·화·토·금·수)을 읽고, 다섯이 고루 있을 때 조화롭다고 봐요. 이 집 주변에는 ${oh(m, "name")}의 기운이 보이지 않아서, 집 안에서 그 기운을 닮은 것으로 채워요.`,
                   `Feng shui reads five energies (wood, fire, earth, metal, water) from the shapes of nearby peaks, and sees a home as balanced when all five are present. ${oh(m, "name")} is missing around this home, so you bring it in with things that share its character.`),
    how: { wood: [["초록 식물을 거실과 현관에 두세요.", "원목 가구나 나무 소품을 더하세요.", "세로로 긴 화병이나 줄무늬가 목의 모양이에요."], ["Put green plants in the living room and entry.", "Add solid-wood furniture or wooden pieces.", "Tall vases and vertical stripes share wood's shape."]],
           fire: [["따뜻한 색 조명을 더하세요.", "붉은 계열 쿠션이나 그림 한 점을 두세요.", "삼각형이나 뾰족한 모양이 화의 모양이에요."], ["Add warm-colored lights.", "Put out a red-toned cushion or a painting.", "Triangles and pointed shapes share fire's shape."]],
           earth: [["베이지나 황토색 패브릭을 써 보세요.", "도자기와 흙으로 빚은 소품을 두세요.", "낮고 넓은 가구가 토의 모양이에요."], ["Try beige or ochre fabrics.", "Add pottery and clay pieces.", "Low, wide furniture shares earth's shape."]],
           metal: [["흰 벽과 흰 패브릭으로 밝혀 주세요.", "둥근 금속 소품을 두세요.", "수납을 깔끔하게 정리하는 것도 금의 기운이에요."], ["Brighten with white walls and white fabrics.", "Add round metal pieces.", "Tidy, orderly storage is metal energy too."]],
           water: [["남색이나 짙은 색으로 포인트를 주세요.", "유리 화병이나 물결무늬 소품을 두세요.", "작은 수반이나 어항도 좋아요."], ["Add navy or dark accents.", "Put out glass vases or wave-patterned pieces.", "A small tabletop fountain or fish tank works too."]] },
  };
  const detailOf = (id) => {
    if (/^oh_/.test(id)) { const m = id.slice(3); return { why: OH_DETAIL.why(m), how: OH_DETAIL.how[m][en() ? 1 : 0] }; }
    const d = DETAIL[id === "weak_bh" ? "weak_cr" : id]; if (!d) return {};
    return { why: d.why[en() ? 1 : 0], how: d.how[en() ? 1 : 0] };
  };
  const ORDER = ["wood", "fire", "earth", "metal", "water"];

  function siteTips(r) {
    const c = r.score.components;
    const f = (k) => c[k].facts;
    const facing = r.site.facing_deg;
    const left = dir(facing - 90), right = dir(facing + 90), back = dir(facing + 180);
    const out = [];
    // fact: this home's reason only (the first sentence), so the opened card doesn't repeat its own steps
    const add = (id, tg, title, body, fact) => out.push({ id, tag: tag(tg), key: tg, title, body, ...detailOf(id),
      fact: fact || String(body).split(/(?<=[.!?])\s+/)[0] });   // key: the Korean type, for its icon
    const enc = f("enclosure");
    if (enc.weak_side === "cheongryong") {
      add("weak_cr", "가구", tr(`${left}쪽을 높여 주세요`, `Raise the ${left} side`),
        tr(`이 집은 왼쪽(현관에서 밖을 볼 때, ${left}쪽) 땅이 낮아요. 그쪽 창가나 벽에 키 큰 화분이나 높은 책장을 두면 양쪽이 균형을 찾아요.`,
           `The land on this home's left (looking out from the door, the ${left}) is low. A tall plant or a high bookcase by the window or wall on that side helps both sides balance.`));
    } else if (enc.weak_side === "baekho") {
      add("weak_bh", "가구", tr(`${right}쪽을 높여 주세요`, `Raise the ${right} side`),
        tr(`이 집은 오른쪽(현관에서 밖을 볼 때, ${right}쪽) 땅이 낮아요. 그쪽에 키 큰 화분이나 높은 수납장을 두면 양쪽이 균형을 찾아요.`,
           `The land on this home's right (looking out from the door, the ${right}) is low. A tall plant or a high cabinet on that side helps both sides balance.`));
    } else if (c.enclosure.score <= 40) {
      add("open_sides", "가구", tr("양옆을 감싸 주세요", "Wrap both sides"),
        tr("양옆이 모두 트인 집이에요. 거실 소파 양옆에 높이가 비슷한 수납장이나 화분을 짝 맞춰 두면 감싸 안는 느낌이 생겨요.",
           "This home is open on both the left and the right. A matching pair of cabinets or plants of similar height on each side of the sofa makes the room feel wrapped."));
    }
    if (c.hyeonmu.score < 70) {
      add("back", "침실", tr("등 뒤를 든든하게", "Support your back"),
        tr("집 뒤를 받쳐 주는 땅이 약해요. 침대 머리와 소파 등은 벽에 붙이고, 뒤가 창이라면 두꺼운 커튼을 달아 주세요.",
           "The land behind the home gives little support. Put the head of the bed and the back of the sofa against a wall, and if there is a window behind, hang thick curtains."));
    }
    if (f("jujak").front_overbearing) {
      add("front_high", "거실", tr("앞쪽은 낮고 밝게", "Keep the front low and bright"),
        tr(`앞의 산이 뒤의 땅보다 높은 집이에요. 현관과 거실 앞쪽에는 낮은 가구와 밝은 조명을 두고, 큰 가구는 안쪽(${back}쪽)으로 옮겨 주세요.`,
           `The hill in front is taller than the land behind this home. Keep low furniture and bright lights at the entry and the front of the living room, and move big furniture toward the back (the ${back}).`));
    }
    const jp = f("jangpung");
    if (jp.wind_open || c.jangpung.score <= 80) {   // rules v0.2: the cold wind is regional
      const w = jp.wind_from_deg != null ? dir(jp.wind_from_deg) : tr("북서", "northwest");
      add("wind", "창", tr("바람길을 다스려요", "Tame the wind"),
        jp.wind_open
          ? tr(`${w}쪽이 열려 있어 찬바람을 많이 받는 집이에요. ${w}쪽 창에 두꺼운 커튼을 달고, 겨울에는 창틈을 막아 주세요.`,
               `The ${w} side is open, so this home gets a lot of cold wind. Hang thick curtains on the ${w} windows and seal the window gaps in winter.`)
          : tr("사방이 낮아 바람을 고루 받는 집이에요. 바람이 드는 쪽 창에 두꺼운 커튼을 달고, 겨울에는 창틈을 막아 주세요.",
               "The land is low all around, so wind reaches this home from every side. Hang thick curtains on the windy side and seal the window gaps in winter."));
    }
    const d = f("deuksu");
    if (d.bend === "hwanpo") {
      const river = d.bend_river ? place(d.bend_river) : null;
      add("hwanpo", "창", tr("물길 쪽 창을 열어 두세요", "Keep the water-side windows clear"),
        tr(`${river ? river + "이" : "가까운 물이"} 집 쪽으로 감싸 흘러요. 풍수에서는 이런 물을 반겨요. 물길 쪽 창은 가리지 말고 깨끗하게 두세요.`,
           `${river || "The water nearby"} curves toward the home. Feng shui welcomes water like this. Don't cover the windows on the water side, and keep them clean.`));
    } else if (d.bend === "straight") {
      add("straight", "현관", tr("흐르는 기운을 붙잡아요", "Hold on to the flowing energy"),
        tr("물이 곧게 흘러 지나가는 집이에요. 풍수에서는 이럴 때 현관 안쪽에 둥근 화분이나 둥근 러그를 두어, 들어온 좋은 기운이 머물게 한다고 해요.",
           "Water runs straight past this home. Feng shui says a round plant pot or a round rug just inside the door helps the good energy that comes in to stay."));
    }
    r.sal.forEach((s) => {
      if (s.id === "bangung") {
        add("bangung", "창", tr("물이 등진 쪽을 채워요", "Fill in the water side"),
          tr(`${s.evidence.river}이 집 바깥쪽으로 굽어 흘러요. 물 쪽 창가에 화분을 두고, 마당이 있다면 나무나 울타리로 물 쪽을 채워 주세요.`,
             `${place(s.evidence.river)} bends away from the home. Put plants by the windows on the water side, and if you have a yard, fill the water side with trees or a fence.`));
      } else if (s.id === "overpass") {
        add("overpass", "창", tr("고가 쪽을 부드럽게 가려요", "Soften the overpass side"),
          tr(`${s.evidence.road}가 가까이 지나가요. 그쪽 창에는 두꺼운 커튼이나 블라인드를, 창가에는 키 큰 화분을 두어 시선과 소음을 가려 주세요.`,
             `The ${place(s.evidence.road)} passes close by. Use thick curtains or blinds on that side's windows, and tall plants by the window, to screen the view and the noise.`));
      }
    });
    const jw = f("jwahyang");   // rules v0.2: winter sun at the site, not the door bearing
    if (jw.sun_lost_h >= 0.5) {
      const mins = jw.sun_lost_h < 2;
      add("light", "조명", tr("집 안을 밝게", "Brighten the inside"),
        tr(`한겨울에 해가 ${mins ? Math.round(jw.sun_lost_h * 12) * 5 + "분" : jw.sun_lost_h.toFixed(1) + "시간"}쯤 산에 가리는 집이에요. 해가 덜 드는 방에는 따뜻한 색 조명을 더해 주세요.`,
           `In midwinter, hills block the sun at this home for about ${mins ? Math.round(jw.sun_lost_h * 12) * 5 + " minutes" : jw.sun_lost_h.toFixed(1) + " hours"}. Add warm-colored lights to the rooms that get less sun.`));
    } else if (!jw.faces_sun && jw.off_south_deg >= 45) {
      add("light", "조명", tr("남쪽 볕을 들여요", "Let the southern sun in"),
        tr("현관이 남쪽을 보지 않는 집이에요. 남쪽으로 난 창은 가리지 말고, 낮에는 커튼을 활짝 열어 볕을 들여 주세요.",
           "This home's door doesn't face south. Don't cover the windows that face south, and open the curtains wide during the day."));
    }
    const missing = ORDER.filter((k) => r.ohaeng[k] === 0);
    if (missing.length) {
      const m = missing[0];
      add("oh_" + m, "색", oh(m, "plain"),
        tr(`풍수에서는 주변 봉우리의 모양으로 다섯 기운(오행)을 읽어요. 이 집 주변에는 ${oh(m, "name")} 모양의 봉우리가 보이지 않아서, ${oh(m, "how")} 같은 것으로 채워 보라고 해요.`,
           `Feng shui reads five energies (the five elements) from the shapes of nearby peaks. There are no ${oh(m, "name")}-shaped peaks around this home, so it suggests filling in with things like ${oh(m, "how")}.`),
        tr(`이 집 주변에는 ${oh(m, "name")} 모양의 봉우리가 보이지 않아요.`, `There are no ${oh(m, "name")}-shaped peaks around this home.`));
    }
    return out;
  }

  const GENERAL = [
    { id: "jeonchak", tag: "현관", title: ["현관은 아담하게, 안은 넓게", "A small entry, a roomy inside"],
      body: ["들어오는 곳은 아담하고 안으로 들어설수록 넓어지는 집을 풍수에서는 좋게 봐요. 현관에는 큰 가구를 두지 말고 신발은 늘 정리해 두세요.",
             "Feng shui likes a home whose entry is small and opens up as you go in. Keep big furniture out of the entry, and keep the shoes tidy."] },
    { id: "mirror", tag: "현관", title: ["현관 정면에 거울을 두지 마세요", "No mirror facing the front door"],
      body: ["문을 열자마자 보이는 거울은 들어오는 기운을 되돌려 보낸다고 해요. 거울은 현관 옆벽에 두는 편이 좋아요.",
             "A mirror you see as soon as the door opens is said to send the incoming energy back out. A side wall of the entry is a better spot."] },
    { id: "bed", tag: "침실", title: ["침대는 문과 일직선을 피해요", "Keep the bed out of line with the door"],
      body: ["방문에서 곧장 침대 발치가 보이면 편히 쉬기 어려워요. 문이 비스듬히 보이는 자리에 침대를 두세요.",
             "If you can see the foot of the bed straight from the doorway, it's hard to rest well. Put the bed where it sees the door at an angle."] },
    { id: "kitchen", tag: "주방", title: ["가스레인지와 싱크대는 마주 보지 않게", "Stove and sink shouldn't face each other"],
      body: ["불과 물이 정면으로 마주 보는 배치예요. 마주 본다면 사이에 나무 도마나 초록 식물을 두어 부드럽게 이어 주세요.",
             "That puts fire and water face to face. If they do, put a wooden cutting board or a green plant between them to soften it."] },
    { id: "corner", tag: "거실", title: ["뾰족한 모서리를 돌려 주세요", "Turn sharp corners away"],
      body: ["소파나 침대를 향한 날카로운 모서리는 긴장을 만들어요. 둥근 가구를 쓰거나 모서리 앞에 화분을 두세요.",
             "Sharp corners pointed at the sofa or bed create tension. Use rounded furniture or put a plant in front of the corner."] },
    { id: "door_light", tag: "현관", title: ["현관은 밝게", "Keep the entry bright"],
      body: ["기운이 들어오는 첫 자리예요. 현관 조명이 어둡다면 따뜻한 색 전구로 바꿔 보세요.",
             "It's the first place energy comes in. If the entry light is dim, try a warm-colored bulb."] },
  ];

  const SEASON = [
    { months: [3, 4, 5], id: "spring", tag: "환기", title: ["봄에는 동남쪽 창을 열어요", "In spring, open the southeast windows"],
      body: ["새 기운이 도는 계절이에요. 아침에 동남쪽 창을 열어 묵은 공기를 내보내 주세요.",
             "It's a season of new energy. Open the southeast windows in the morning to let the stale air out."] },
    { months: [6, 7, 8], id: "summer", tag: "습기", title: ["여름엔 물기를 말려요", "In summer, dry things out"],
      body: ["습기가 고이면 기운도 무거워져요. 욕실과 현관의 물기를 자주 닦고 바람이 통하게 해 주세요.",
             "When damp builds up, the energy feels heavy too. Wipe up water in the bathroom and entry often, and let the air flow."] },
    { months: [9, 10, 11], id: "autumn", tag: "패브릭", title: ["가을엔 따뜻한 색을 더해요", "In autumn, add warm colors"],
      body: ["공기가 마르고 서늘해지는 때예요. 쿠션과 러그를 황토·베이지 같은 따뜻한 색으로 바꾸고 식물에 물을 챙겨 주세요.",
             "The air turns dry and cool. Switch cushions and rugs to warm colors like ochre and beige, and keep the plants watered."] },
    { months: [12, 1, 2], id: "winter", tag: "보온", title: ["겨울엔 서북쪽 틈을 막아요", "In winter, seal the northwest gaps"],
      body: ["찬 바람은 서북에서 들어와요. 서북쪽 창의 틈을 막고 두꺼운 커튼을 달아 주세요.",
             "Cold wind comes in from the northwest. Seal the gaps in the northwest windows and hang thick curtains."] },
  ];
  const pick = (x) => ({ id: x.id, tag: tag(x.tag), title: x.title[en() ? 1 : 0], body: x.body[en() ? 1 : 0] });

  // approximate dates of the 24 solar terms (they move by a day or so between years)
  const JEOLGI = [[1, 5, "소한", "Minor Cold"], [1, 20, "대한", "Major Cold"], [2, 4, "입춘", "Spring begins"],
    [2, 19, "우수", "Rain Water"], [3, 5, "경칩", "Insects Awaken"], [3, 20, "춘분", "Spring Equinox"],
    [4, 4, "청명", "Clear and Bright"], [4, 20, "곡우", "Grain Rain"], [5, 5, "입하", "Summer begins"],
    [5, 21, "소만", "Grain Fills"], [6, 5, "망종", "Grain in Ear"], [6, 21, "하지", "Summer Solstice"],
    [7, 7, "소서", "Minor Heat"], [7, 22, "대서", "Major Heat"], [8, 7, "입추", "Autumn begins"],
    [8, 23, "처서", "Heat Ends"], [9, 7, "백로", "White Dew"], [9, 22, "추분", "Autumn Equinox"],
    [10, 8, "한로", "Cold Dew"], [10, 23, "상강", "Frost Descends"], [11, 7, "입동", "Winter begins"],
    [11, 22, "소설", "Minor Snow"], [12, 7, "대설", "Major Snow"], [12, 21, "동지", "Winter Solstice"]];
  function jeolgi(date) {
    const m = date.getMonth() + 1, d = date.getDate();
    let name = tr("동지", "Winter Solstice");
    JEOLGI.forEach(([jm, jd, n, e]) => { if (m > jm || (m === jm && d >= jd)) name = tr(n, e); });
    return name;
  }

  function pool(r, date) {
    const m = date.getMonth() + 1;
    const site = siteTips(r);
    // site tips come up twice as often as general ones: they are what makes the card "this home's"
    return [...site, ...site, ...GENERAL.map(pick), ...SEASON.filter((s) => s.months.includes(m)).map(pick)];
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
