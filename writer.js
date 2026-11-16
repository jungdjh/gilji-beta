// Hand-written stand-in for the report writer, reading v2 (owner 2026-11-13: "plain terms that
// anyone can understand"). Same shape and rules as api/pungsu_writer.py: headline, good, watch and
// sal are in everyday words with no 풍수 terms; the terms live only in the folded "pungsu" section.
// Only facts and numbers that are in data.js (rules v0.6). Voice: warm, polite 해요체.
window.PUNGSU_WRITER = {
  gyeongbokgung: {
    headline: "뒤로 북악산이 받쳐 주고 앞에 남산이 마주 보는, 반듯한 집이에요.",
    good: [
      "뒤로 북악산이 솟아 집을 든든히 받쳐 줘요. 겨울 찬바람이 오는 뒤쪽도 막혀 있어요.",
      "앞에는 남산이 낮게 마주 보고, 그 사이가 넓게 트여 있어요.",
      "집이 남쪽을 보고 있어 겨울 햇빛이 잘 들어요. 산에 가리는 건 15분쯤이에요.",
    ],
    watch: [
      "왼쪽(동쪽)이 낮게 트여 있어, 오른쪽보다 감싸 주는 힘이 약해요.",
      "경회지의 물은 집 쪽으로 감싸지 않고 곧게 지나가요.",
    ],
    sal: {},
    pungsu: {
      sides: "풍수에서는 집 뒤의 높은 땅을 현무, 앞의 땅을 주작, 앞의 낮은 산을 안산이라고 해요. 이곳은 북악산이 현무이자 이 땅의 으뜸 산(주산)이고, 남산이 안산이에요. 왼쪽 땅(청룡)은 낮고, 오른쪽 땅(백호)은 인왕산이 감싸 줘요.",
      ohaeng: "봉우리 모양으로 보면 둥근 금(金)의 산(인왕산, 구진봉, 남산)이 가장 많고, 곧게 솟은 목(木)의 산(북악산, 안산)이 뒤를 이어요.",
      giun: {
        wealth: "풍수에서는 물이 감싸 흘러야 재물이 머문다고 하는데, 이곳 물은 곧게 흘러요. 앞의 남산은 재물을 붙잡아 주는 산으로 봐요.",
        health: "풍수에서 건강과 이어 보는 바람막이가 잘 되어 있고, 땅도 평평해요.",
        harmony: "햇빛은 잘 들지만 왼쪽이 낮게 트여 한쪽으로 기울어요.",
        career: "남산이 앞을 받치고 북악산이 뒤를 받쳐 줘요. 앞은 조금 트였어요.",
        stability: "뒤의 산이 높고 찬바람 쪽이 막혀 있어요.",
      },
    },
  },
  eunma: {
    headline: "양재천이 집 쪽으로 감싸 흐르지만, 뒤가 낮고 앞산이 더 높은 집이에요.",
    good: [
      "왼쪽(동쪽)에서 양재천이 집 쪽으로 감싸 굽어 흘러요.",
    ],
    watch: [
      "집 뒤의 언덕이 낮아 받쳐 주는 힘이 약하고, 겨울 찬바람이 오는 뒤쪽도 열려 있어요.",
      "이 동네에서 가장 큰 산(대모산)이 집 뒤가 아니라 앞에 있고, 앞산이 뒤보다 높아 앞이 눌린 모양이에요.",
      "양옆도 낮게 트여 있어요.",
    ],
    sal: {},
    pungsu: {
      sides: "풍수에서는 이 땅의 으뜸 산(주산)을 등지고 앉는 것을 바르게 보는데, 이 집은 주산인 대모산을 마주 보고 있어요. 집 뒤의 높은 땅(현무)은 낮고, 앞의 대모산과 구룡산이 더 높아 손님 산이 주인 산을 누르는 모양이라고 해요. 왼쪽(청룡)과 오른쪽(백호)은 트였어요. 양재천은 집 쪽으로 감싸 흐르는 환포예요.",
      ohaeng: "앞의 대모산과 구룡산은 둥근 금(金)이고, 오른쪽에 뾰족한 화(火)와 물결 같은 수(水)의 봉우리가 있어요.",
      giun: {
        wealth: "풍수에서는 물이 집 쪽으로 감싸 흐르면 재물이 머문다고 하는데, 양재천이 그렇게 흘러요.",
        health: "땅은 평평하지만 겨울 찬바람이 오는 쪽이 열려 있어요.",
        harmony: "양옆이 모두 트여 감싸 주는 땅이 없어요.",
        career: "앞산이 뒤보다 높고, 집이 으뜸 산을 마주 보고 앉았어요.",
        stability: "뒤가 낮고, 으뜸 산을 마주 보며, 찬바람 쪽이 열려 있어요.",
      },
    },
  },
  mokdong7: {
    headline: "앞에 낮은 산이 마주 보지만, 뒤와 양옆이 트여 바람이 드는 집이에요.",
    good: [
      "앞(남쪽)에 갈산이 낮게 마주 보고 있어요.",
      "집이 남쪽을 보고 있어 겨울 햇빛이 잘 들어요. 산에 가리는 건 10분쯤이에요.",
    ],
    watch: [
      "집 뒤의 높은 땅이 멀어 받쳐 주는 힘이 약하고, 겨울 찬바람이 오는 뒤쪽이 열려 있어요.",
      "양옆도 낮게 트여 있어요.",
    ],
    sal: {
      bangung: { line: "왼쪽(동쪽)의 안양천이 집을 감싸지 않고 바깥쪽으로 굽어 흘러요.",
                 bibo: "물이 있는 쪽에 나무를 줄지어 심거나 울타리를 두면 좋아요." },
    },
    pungsu: {
      sides: "이 땅의 으뜸 산(주산)인 봉제산이 뒤에 있어 집이 땅의 방향과 맞게 앉았어요. 다만 현무(집 뒤의 높은 땅)는 멀고 낮아요. 앞의 갈산이 안산(집 앞의 낮은 산)이에요. 청룡(왼쪽 땅)과 백호(오른쪽 땅)는 트였어요. 안양천은 바깥으로 굽는 반궁수라, 살펴볼 점으로 반궁수살이 있어요.",
      ohaeng: "뒤의 봉제산·용왕산과 앞의 갈산은 둥근 금(金), 갈탄봉은 물결 같은 수(水)이고, 오른쪽에 평평한 토(土)의 봉우리가 있어요.",
      giun: {
        wealth: "앞의 안산은 재물을 붙잡는 산으로 보지만, 물이 바깥으로 굽어 흘러 재물이 머무는 모양은 아니라고 해요.",
        health: "땅은 평평하지만 찬바람 쪽이 열려 있고, 물이 바깥으로 굽어요.",
        harmony: "햇빛은 잘 들지만 양옆이 트여 있어요.",
        career: "안산이 있고 뒤의 땅이 받쳐 줘요. 앞은 넓게 트였어요.",
        stability: "뒤의 땅은 있지만 찬바람 쪽이 열려 있어요.",
      },
    },
  },
  wolgok_highway: {
    headline: "뒤가 막혀 찬바람은 피하지만, 고가도로와 큰길이 집 가까이 있는 집이에요.",
    good: [
      "뒤의 높은 땅이 받쳐 주고, 겨울 찬바람이 오는 뒤쪽이 막혀 있어요.",
      "앞(남동쪽)에 천장산이 낮게 마주 보고 있어요.",
    ],
    watch: [
      "이 동네에서 가장 큰 산(천장산)이 집 뒤가 아니라 앞에 있어요. 풍수에서는 큰 산을 등지는 것을 바르게 봐요.",
      "양옆이 낮게 트여 있어요.",
      "집이 남쪽을 보지 않아 겨울 햇빛이 덜 들고, 55분쯤은 산에 가려요.",
    ],
    sal: {
      nochung: { line: "40m 앞의 화랑로가 집을 향해 곧장 뻗어 와요.",
                 bibo: "현관 앞에 키 큰 화분 두 개나 낮은 담장·화단을 두고, 가능하면 현관 방향을 조금 틀어 보세요." },
      bangung: { line: "오른쪽(남서쪽)의 정릉천이 집을 감싸지 않고 바깥쪽으로 굽어 흘러요.",
                 bibo: "물이 있는 쪽에 나무를 줄지어 심거나 울타리를 두면 좋아요." },
      overpass: { line: "북부간선도로 고가가 18m 가까이 지나가요.",
                  bibo: "앞쪽에 두꺼운 생울타리나 가림막을 두면 좋아요." },
    },
    pungsu: {
      sides: "풍수에서는 이 땅의 으뜸 산(주산)을 등지는 것이 바른데, 이 집은 주산인 천장산을 마주 보고 앉았어요. 천장산은 안산(집 앞의 낮은 산)이기도 해요. 현무(집 뒤의 높은 땅)는 받쳐 주지만, 청룡(왼쪽 땅)과 백호(오른쪽 땅)는 낮게 트였어요. 살펴볼 점은 길이 집을 곧장 향하는 노충살, 물이 바깥으로 굽는 반궁수살, 그리고 고가·교량 압박이에요.",
      ohaeng: "천장산, 개운산과 뒤의 봉우리는 평평한 토(土)가 많고, 뒤에 둥근 금(金)의 봉우리가 하나 있어요.",
      giun: {
        wealth: "안산은 재물을 붙잡는 산으로 보지만, 물이 바깥으로 굽고 길이 집을 향해 와요.",
        health: "찬바람 쪽은 막히고 땅도 평평하지만, 길과 고가, 바깥으로 굽는 물이 살펴볼 점이에요.",
        harmony: "양옆이 트이고 겨울 햇빛이 덜 들어요.",
        career: "안산은 있지만 으뜸 산을 마주 보고 앉았어요.",
        stability: "뒤의 땅이 받치고 찬바람 쪽이 막혔지만, 으뜸 산을 마주 보고 있어요.",
      },
    },
  },

  // ---- US reference set (기준 터): famous residences. Public landmarks, not homes. Text from engine
  // facts only; where the land reading and the house's history disagree, the text says what the land shows.
  us_filoli: {
    headline: "큰 산이 뒤를 받치고 물이 집 쪽으로 감싸 흐르지만, 왼쪽이 조금 낮은 집이에요.",
    good: [
      "뒤(남서쪽)로 큰 산줄기가 솟아 집을 든든히 받쳐 줘요. 겨울 찬바람이 오는 뒤 왼쪽도 막혀 있어요.",
      "가까운 물이 집 쪽으로 감싸 굽어 흐르고, 앞에는 낮은 산이 알맞게 마주 보고 있어요.",
    ],
    watch: [
      "왼쪽(북서쪽)이 낮아 감싸 주는 힘이 약해요.",
      "집이 해를 향하지 않아 겨울 햇빛이 덜 들고, 85분쯤 산에 가려요.",
    ],
    sal: {},
    pungsu: {
      sides: "뒤에는 Kings Mountain이 있고, 현무(집 뒤의 높은 땅)가 549m 솟아 있어요. 이 땅의 으뜸 산(주산)이 집 뒤에 있어 방향도 맞아요. 앞에는 안산(집 앞의 낮은 산)이 있고, 물은 환포(집 쪽으로 감싸 흐름)예요. 다만 청룡(왼쪽 땅)이 낮아요.",
      ohaeng: "뒤의 뾰족한 화(火) 봉우리와 둥근 금(金)의 Kings Mountain이 두드러지고, 앞에는 물결 같은 수(水)와 평평한 토(土)의 봉우리가 있어요.",
      giun: {
        wealth: "풍수에서는 물이 집 쪽으로 감싸 흐르고 앞에 안산이 있으면 재물이 머문다고 하는데, 이곳이 그래요.",
        health: "찬바람 쪽이 막히고 땅이 평평해요.",
        harmony: "왼쪽이 낮고 겨울 햇빛이 조금 덜 들어요.",
        career: "뒤의 큰 산과 앞의 안산이 모두 있어요.",
        stability: "큰 산이 뒤를 받치고 찬바람 쪽이 막혀 있어요.",
      },
    },
  },
  us_glenmont: {
    headline: "뒤의 높은 땅이 받쳐 주고 찬바람이 막혔지만, 오른쪽이 트인 집이에요.",
    good: [
      "뒤(남서쪽)의 땅이 높아 집을 받쳐 줘요.",
      "겨울 찬바람이 오는 왼쪽(북서쪽)은 땅이 감싸 막아 줘요.",
    ],
    watch: [
      "오른쪽(남동쪽)이 낮게 트여 있어요.",
      "앞이 트여 있고, 앞에 마주 보는 낮은 산이 없어요.",
      "집이 해를 향하지 않아 겨울 햇빛이 덜 들고, 40분쯤 가려요.",
    ],
    sal: {},
    pungsu: {
      sides: "현무(집 뒤의 높은 땅)가 99m 솟아 받쳐 주고, 청룡(왼쪽 땅)이 감싸 줘요. 백호(오른쪽 땅)는 트였고, 주작(집 앞의 땅)에는 안산(집 앞의 낮은 산)이 없어요. 주변이 평평해 이 땅의 으뜸 산(주산)이 없어서, 집의 방향은 문을 기준으로 읽어요. 왼쪽 109m의 Second River는 곧게 흘러요.",
      ohaeng: "주변에 두드러진 봉우리가 없어요.",
      giun: {
        wealth: "물이 곧게 흘러 집을 감싸지는 않아요.",
        health: "찬바람 쪽이 막히고 땅이 평평해요.",
        harmony: "오른쪽이 트였고 겨울 햇빛이 조금 덜 들어요.",
        career: "뒤의 땅은 받쳐 주지만 앞이 트였어요.",
        stability: "뒤의 땅이 받치고 찬바람 쪽이 막혀 있어요.",
      },
    },
  },
  us_mount_vernon: {
    headline: "물이 집 쪽으로 감싸 흐르지만, 사방이 트여 바람을 그대로 받는 집이에요.",
    good: [
      "뒤(남동쪽)의 가까운 물이 집 쪽으로 감싸 굽어 흘러요.",
      "겨울 햇빛을 가리는 산이 없어요.",
    ],
    watch: [
      "겨울 찬바람이 오는 앞(북서쪽)이 트여 있어요.",
      "뒤의 땅이 낮고, 양옆도 감싸 주는 땅 없이 트여 있어요.",
    ],
    sal: {},
    pungsu: {
      sides: "현무(집 뒤의 높은 땅)는 낮고, 주작(집 앞의 땅)은 넓게 트였으며 안산(집 앞의 낮은 산)은 없어요. 청룡(왼쪽 땅)과 백호(오른쪽 땅)도 트였어요. 주변이 평평해 이 땅의 으뜸 산(주산)이 없어요. 물은 환포(집 쪽으로 감싸 흐름)예요.",
      ohaeng: "주변에 두드러진 봉우리가 없어요.",
      giun: {
        wealth: "풍수에서는 물이 집 쪽으로 감싸 흐르면 재물이 머문다고 하는데, 이곳 물이 그렇게 흘러요.",
        health: "땅은 평평하지만 찬바람 쪽이 열려 있어요.",
        harmony: "햇빛을 가리는 것은 없지만 양옆이 트였어요.",
        career: "앞이 트였고 뒤의 땅이 낮아요.",
        stability: "뒤가 낮고 찬바람 쪽이 열려 있어요.",
      },
    },
  },
  us_hearst: {
    headline: "물이 집 쪽으로 감싸 흐르지만, 사방이 트이고 집이 땅과 비껴 앉은 집이에요.",
    good: [
      "왼쪽(남쪽)의 Arryo del Puerto가 집 쪽으로 감싸 굽어 흘러요.",
      "뒤(동쪽)에 높은 땅이 있어요.",
    ],
    watch: [
      "이 동네에서 가장 큰 산이 집 뒤가 아니라 옆에 있어서, 집이 땅의 방향과 비껴 앉았어요.",
      "앞과 양옆이 트여 있고, 겨울 찬바람이 오는 왼쪽(남동쪽)도 열려 있어요.",
      "집이 해를 향하지 않아 겨울 햇빛이 덜 들어요.",
    ],
    sal: {},
    pungsu: {
      sides: "풍수에서는 이 땅의 으뜸 산(주산)을 등지는 것이 바른데, 이곳 주산은 옆에 있어요. 현무(집 뒤의 높은 땅)는 108m 솟았지만, 주작(집 앞의 땅)은 트였고 안산(집 앞의 낮은 산)은 없어요. 청룡(왼쪽 땅)과 백호(오른쪽 땅)도 트였어요. 물은 환포(집 쪽으로 감싸 흐름)예요.",
      ohaeng: "왼쪽에 평평한 토(土), 뒤에 뾰족한 화(火)의 봉우리가 있어요.",
      giun: {
        wealth: "풍수에서는 물이 집 쪽으로 감싸 흐르면 재물이 머문다고 하는데, Arryo del Puerto가 그렇게 흘러요.",
        health: "땅은 평평하지만 찬바람 쪽이 열려 있어요.",
        harmony: "양옆이 트였어요.",
        career: "뒤의 땅이 받쳐 주지만 앞이 트였어요.",
        stability: "뒤의 땅은 있지만 찬바람 쪽이 열려 있어요.",
      },
    },
  },
  us_fallingwater: {
    headline: "뒤와 양옆을 언덕이 감싸 주지만, 집 바로 밑으로 Bear Run이 흐르는 집이에요.",
    good: [
      "집 뒤와 양옆의 땅이 높아서, 등받이와 팔걸이가 있는 의자처럼 집을 감싸 줘요.",
      "겨울 찬바람이 오는 앞(북쪽)도 막혀 있어요.",
    ],
    watch: [
      "앞이 가까이에서 막혀 있어요.",
      "집이 해를 향하지 않아 겨울 햇빛이 덜 들고, 75분쯤 산에 가려요.",
      "집 주변 땅이 비탈져요.",
    ],
    sal: {
      dead_end: { line: "26m 떨어진 곳에 막다른 길이 있어요.",
                  bibo: "골목 입구에 조명과 화분을 두면 좋아요." },
      eumseup: { line: "Bear Run이 집과 거의 같은 높이로 흐르고, 주변 땅 대부분이 집보다 높아 땅이 습해요.",
                 bibo: "배수로와 빗물받이를 살피고 집 둘레 흙은 바깥으로 기울게 해 주세요. 제습기와 맞통풍으로 습기를 빼고, 우기 전에 역류 방지와 낮은 창·환기구를 점검해 두세요." },
      halgak: { line: "Bear Run이 집 바로 밑으로 흘러요.",
                bibo: "기초와 축대가 물에 깎이지 않는지 해마다 살피고, 집 아래와 물 쪽 벽의 습기를 빼 주세요. 침실은 물에서 먼 쪽에 두세요." },
    },
    pungsu: {
      sides: "현무(집 뒤의 높은 땅)가 295m 솟아 있고, 청룡(왼쪽 땅)과 백호(오른쪽 땅)가 모두 감싸 줘요. 주작(집 앞의 땅)은 가까이 막혀 있고 안산(집 앞의 낮은 산)은 없어요. 주변에 이 땅의 으뜸 산(주산)이 따로 없어, 집 방향은 문을 기준으로 읽어요. 살펴볼 점은 막다른 골목, 땅이 습한 음습살, 물이 집 밑을 지나는 할각수살이에요.",
      ohaeng: "주변에 두드러진 봉우리가 없어요.",
      giun: {
        wealth: "물이 곧게 흐르고 집 뒤 가까이에도 물이 있어, 풍수에서 재물이 머문다고 보는 모양은 아니에요.",
        health: "찬바람 쪽은 막혔지만, 땅이 비탈지고 물과 습기가 살펴볼 점이에요.",
        harmony: "양옆이 감싸 주지만 겨울 햇빛이 덜 들어요.",
        career: "뒤의 땅은 높지만 앞이 가까이 막혔어요.",
        stability: "뒤의 땅이 높고 찬바람 쪽이 막혀 있어요.",
      },
    },
  },
};

// English versions of the nine readings above (owner 2026-11-15: 한국어 / ENG toggle). Same shape,
// same facts and numbers, nothing added. Hand-translated, not generated. Plain words first; the
// romanized 풍수 terms appear only in the folded "pungsu" section, where the terms are the point.
window.PUNGSU_WRITER_EN = {
  gyeongbokgung: {
    headline: "A well-set home, with Bugaksan behind it and Namsan facing it in front.",
    good: [
      "Bugaksan rises behind and gives the home strong support. The back, where the cold winter wind comes from, is sheltered too.",
      "In front, Namsan faces the home, low, and the space in between is wide and open.",
      "The home faces south, so the winter sun comes in well. The hills block it for only about 15 minutes.",
    ],
    watch: [
      "The left (east) side is low and open, so it wraps the home less than the right side does.",
      "The water of Gyeonghoeji doesn't curve toward the home; it runs straight past.",
    ],
    sal: {},
    pungsu: {
      sides: "In feng shui, the high land behind a home is called hyeonmu, the land in front jujak, and the low hill in front ansan. Here Bugaksan is the hyeonmu and also the main mountain of this land (jusan), and Namsan is the ansan. The land on the left (cheongnyong) is low, and Inwangsan wraps the right (baekho).",
      ohaeng: "By peak shape, round metal (金) hills (Inwangsan, Gujinbong, Namsan) are the most common, followed by tall, straight wood (木) hills (Bugaksan, Ansan).",
      giun: {
        wealth: "Feng shui says wealth stays where water curves around a home, but the water here runs straight. Namsan in front is seen as a hill that holds on to wealth.",
        health: "The shelter from the wind, which feng shui links to health, is good, and the land is level.",
        harmony: "The sun comes in well, but the low, open left side tips the balance to one side.",
        career: "Namsan supports the front and Bugaksan supports the back. The front is a little open.",
        stability: "The hill behind is high and the cold-wind side is sheltered.",
      },
    },
  },
  eunma: {
    headline: "Yangjaecheon curves toward this home, but the back is low and the hill in front is taller.",
    good: [
      "On the left (east), Yangjaecheon bends and curves toward the home.",
    ],
    watch: [
      "The rise behind the home is low, so its support is weak, and the back, where the cold winter wind comes from, is open.",
      "The biggest hill in the area (Daemosan) is in front of the home, not behind it, and the hill in front is taller than the back, so the front feels pressed down.",
      "Both sides are low and open too.",
    ],
    sal: {},
    pungsu: {
      sides: "In feng shui, sitting with your back to the main mountain of the land (jusan) is seen as right, but this home faces its jusan, Daemosan. The high land behind (hyeonmu) is low, and Daemosan and Guryongsan in front are taller, which feng shui calls the guest hill pressing down on the host hill. The left (cheongnyong) and right (baekho) are open. Yangjaecheon curves toward the home, which is called hwanpo.",
      ohaeng: "Daemosan and Guryongsan in front are round metal (金) hills, and on the right there are a pointed fire (火) peak and a wavy water (水) peak.",
      giun: {
        wealth: "Feng shui says wealth stays where water curves toward a home, and Yangjaecheon does just that.",
        health: "The land is level, but the side the cold winter wind comes from is open.",
        harmony: "Both sides are open, with no land wrapping around the home.",
        career: "The hill in front is taller than the back, and the home sits facing the main mountain.",
        stability: "The back is low, the home faces the main mountain, and the cold-wind side is open.",
      },
    },
  },
  mokdong7: {
    headline: "A low hill faces this home in front, but the back and both sides are open, so the wind comes in.",
    good: [
      "In front (south), Galsan faces the home, low.",
      "The home faces south, so the winter sun comes in well. The hills block it for only about 10 minutes.",
    ],
    watch: [
      "The high land behind the home is far away, so its support is weak, and the back, where the cold winter wind comes from, is open.",
      "Both sides are low and open too.",
    ],
    sal: {
      bangung: { line: "On the left (east), Anyangcheon doesn't curve around the home; it bends away from it.",
                 bibo: "Plant a row of trees or put up a fence on the side facing the water." },
    },
    pungsu: {
      sides: "Bongjesan, the main mountain of this land (jusan), is behind the home, so the home sits in line with the land. But the high land behind (hyeonmu) is far and low. Galsan in front is the ansan (the low hill in front). The left (cheongnyong) and right (baekho) are open. Anyangcheon bends away from the home (bangungsu), so there is one thing to watch: bangungsu-sal.",
      ohaeng: "Bongjesan and Yongwangsan behind and Galsan in front are round metal (金) hills, Galtanbong is a wavy water (水) peak, and on the right there is a flat earth (土) peak.",
      giun: {
        wealth: "The ansan in front is seen as a hill that holds on to wealth, but the water bends away, which feng shui says is not the shape where wealth stays.",
        health: "The land is level, but the cold-wind side is open and the water bends away.",
        harmony: "The sun comes in well, but both sides are open.",
        career: "There is an ansan, and the land behind gives support. The front is wide open.",
        stability: "There is land behind, but the cold-wind side is open.",
      },
    },
  },
  wolgok_highway: {
    headline: "The back is sheltered from the cold wind, but an overpass and a big road are close to this home.",
    good: [
      "The high land behind supports the home, and the back, where the cold winter wind comes from, is sheltered.",
      "In front (southeast), Cheonjangsan faces the home, low.",
    ],
    watch: [
      "The biggest hill in the area (Cheonjangsan) is in front of the home, not behind it. Feng shui sees it as right to have the big hill at your back.",
      "Both sides are low and open.",
      "The home doesn't face south, so less winter sun comes in, and the hills block it for about 55 minutes.",
    ],
    sal: {
      nochung: { line: "Hwarang-ro, 40 m in front, runs straight at the home.",
                 bibo: "Put two tall plant pots, or a low wall or flower bed, in front of the door, and if you can, turn the door's direction a little." },
      bangung: { line: "On the right (southwest), Jeongneungcheon doesn't curve around the home; it bends away from it.",
                 bibo: "Plant a row of trees or put up a fence on the side facing the water." },
      overpass: { line: "The Bukbu Expressway overpass passes as close as 18 m.",
                  bibo: "A thick hedge or a screen in front helps." },
    },
    pungsu: {
      sides: "In feng shui, it is right to have the main mountain of the land (jusan) at your back, but this home faces its jusan, Cheonjangsan. Cheonjangsan is also the ansan (the low hill in front). The high land behind (hyeonmu) gives support, but the left (cheongnyong) and right (baekho) are low and open. Things to watch: a road aimed straight at the home (nochung-sal), water bending away (bangungsu-sal), and an overpass or bridge pressing in.",
      ohaeng: "Cheonjangsan, Gaeunsan and the peaks behind are mostly flat earth (土), with one round metal (金) peak behind.",
      giun: {
        wealth: "The ansan is seen as a hill that holds on to wealth, but the water bends away and a road comes straight at the home.",
        health: "The cold-wind side is sheltered and the land is level, but the road, the overpass and the water bending away are things to watch.",
        harmony: "Both sides are open and less winter sun comes in.",
        career: "There is an ansan, but the home sits facing the main mountain.",
        stability: "The land behind supports it and the cold-wind side is sheltered, but it faces the main mountain.",
      },
    },
  },

  us_filoli: {
    headline: "A big mountain backs this home and water curves toward it, but the left side is a little low.",
    good: [
      "Behind (southwest), a big ridge rises and gives the home strong support. The back left, where the cold winter wind comes from, is sheltered too.",
      "Water nearby bends and curves toward the home, and a low hill faces it in front, just right.",
    ],
    watch: [
      "The left (northwest) side is low, so it wraps the home less.",
      "The home doesn't face the sun, so less winter sun comes in, and the hills block it for about 85 minutes.",
    ],
    sal: {},
    pungsu: {
      sides: "Kings Mountain is behind, and the high land behind (hyeonmu) rises 549 m. The main mountain of this land (jusan) is behind the home, so the direction fits too. There is an ansan (a low hill in front), and the water is hwanpo (curving toward the home). But the left side (cheongnyong) is low.",
      ohaeng: "A pointed fire (火) peak and the round metal (金) Kings Mountain stand out behind, and in front there are wavy water (水) and flat earth (土) peaks.",
      giun: {
        wealth: "Feng shui says wealth stays when water curves toward the home and there is an ansan in front, and that is the case here.",
        health: "The cold-wind side is sheltered and the land is level.",
        harmony: "The left side is low and a little less winter sun comes in.",
        career: "There is both a big mountain behind and an ansan in front.",
        stability: "A big mountain backs the home and the cold-wind side is sheltered.",
      },
    },
  },
  us_glenmont: {
    headline: "The high land behind supports this home and the cold wind is blocked, but the right side is open.",
    good: [
      "The land behind (southwest) is high and supports the home.",
      "On the left (northwest), where the cold winter wind comes from, the land wraps around and blocks it.",
    ],
    watch: [
      "The right (southeast) side is low and open.",
      "The front is open, with no low hill facing the home.",
      "The home doesn't face the sun, so less winter sun comes in, and it is blocked for about 40 minutes.",
    ],
    sal: {},
    pungsu: {
      sides: "The high land behind (hyeonmu) rises 99 m and gives support, and the left (cheongnyong) wraps around. The right (baekho) is open, and there is no ansan (low hill in front) in the land in front (jujak). The area around is level, so there is no main mountain (jusan), and the home's direction is read from the door. Second River, 109 m to the left, runs straight.",
      ohaeng: "There are no standout peaks around.",
      giun: {
        wealth: "The water runs straight, so it doesn't wrap around the home.",
        health: "The cold-wind side is sheltered and the land is level.",
        harmony: "The right side is open and a little less winter sun comes in.",
        career: "The land behind gives support, but the front is open.",
        stability: "The land behind supports it and the cold-wind side is sheltered.",
      },
    },
  },
  us_mount_vernon: {
    headline: "Water curves toward this home, but it is open on all sides and takes the wind head-on.",
    good: [
      "Water close behind (southeast) bends and curves toward the home.",
      "No hills block the winter sun.",
    ],
    watch: [
      "The front (northwest), where the cold winter wind comes from, is open.",
      "The land behind is low, and both sides are open, with no land wrapping around the home.",
    ],
    sal: {},
    pungsu: {
      sides: "The high land behind (hyeonmu) is low, the land in front (jujak) is wide open, and there is no ansan (low hill in front). The left (cheongnyong) and right (baekho) are open too. The area around is level, so there is no main mountain (jusan). The water is hwanpo (curving toward the home).",
      ohaeng: "There are no standout peaks around.",
      giun: {
        wealth: "Feng shui says wealth stays where water curves toward a home, and the water here does that.",
        health: "The land is level, but the cold-wind side is open.",
        harmony: "Nothing blocks the sun, but both sides are open.",
        career: "The front is open and the land behind is low.",
        stability: "The back is low and the cold-wind side is open.",
      },
    },
  },
  us_hearst: {
    headline: "Water curves toward this home, but it is open on all sides and sits at an angle to the land.",
    good: [
      "On the left (south), Arryo del Puerto bends and curves toward the home.",
      "There is high land behind (east).",
    ],
    watch: [
      "The biggest hill in the area is beside the home, not behind it, so the home sits at an angle to the land.",
      "The front and both sides are open, and the left (southeast), where the cold winter wind comes from, is open too.",
      "The home doesn't face the sun, so less winter sun comes in.",
    ],
    sal: {},
    pungsu: {
      sides: "In feng shui, it is right to have the main mountain of the land (jusan) at your back, but here the jusan is to the side. The high land behind (hyeonmu) rises 108 m, but the land in front (jujak) is open and there is no ansan (low hill in front). The left (cheongnyong) and right (baekho) are open too. The water is hwanpo (curving toward the home).",
      ohaeng: "There is a flat earth (土) peak on the left and a pointed fire (火) peak behind.",
      giun: {
        wealth: "Feng shui says wealth stays where water curves toward a home, and Arryo del Puerto does that.",
        health: "The land is level, but the cold-wind side is open.",
        harmony: "Both sides are open.",
        career: "The land behind gives support, but the front is open.",
        stability: "There is land behind, but the cold-wind side is open.",
      },
    },
  },
  us_fallingwater: {
    headline: "Hills wrap the back and both sides of this home, but Bear Run flows right under it.",
    good: [
      "The land behind and on both sides is high, so it wraps the home like a chair with a back and armrests.",
      "The front (north), where the cold winter wind comes from, is sheltered too.",
    ],
    watch: [
      "The front is closed in, close by.",
      "The home doesn't face the sun, so less winter sun comes in, and the hills block it for about 75 minutes.",
      "The ground around the home slopes.",
    ],
    sal: {
      dead_end: { line: "There is a dead-end street 26 m away.",
                  bibo: "Put lights and plant pots at the entrance to the lane." },
      eumseup: { line: "Bear Run flows at almost the same height as the home, and most of the land around is higher than the home, so the ground is damp.",
                 bibo: "Check the drains and gutters, and slope the soil around the home away from it. Dry the air with a dehumidifier and cross-breezes, and before the rainy season check the backflow protection and the low windows and vents." },
      halgak: { line: "Bear Run flows right under the home.",
                bibo: "Check every year that the water isn't wearing away the foundation and retaining walls, and dry out the damp under the home and on the walls facing the water. Put bedrooms on the side away from the water." },
    },
    pungsu: {
      sides: "The high land behind (hyeonmu) rises 295 m, and the left (cheongnyong) and right (baekho) both wrap around. The land in front (jujak) is closed in close by, and there is no ansan (low hill in front). There is no separate main mountain (jusan) around, so the home's direction is read from the door. Things to watch: a dead-end lane, damp ground (eumseup-sal), and water passing under the home (halgaksu-sal).",
      ohaeng: "There are no standout peaks around.",
      giun: {
        wealth: "The water runs straight and there is water close behind the home too, so it isn't the shape feng shui sees as wealth staying.",
        health: "The cold-wind side is sheltered, but the slope, the water and the damp are things to watch.",
        harmony: "Both sides wrap around, but less winter sun comes in.",
        career: "The land behind is high, but the front is closed in close by.",
        stability: "The land behind is high and the cold-wind side is sheltered.",
      },
    },
  },
};
