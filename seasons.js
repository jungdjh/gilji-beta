// 이번 주 박씨 (owner, Nov 21: "weekly or monthly tips depending on the season ... appropriate to each house").
// A tip is built from two parts, so nothing is updated by hand and every home gets its own mix:
//   1. the moment, from the date: a holiday that falls this week (US and Korean), or else the current 절기 (24 solar terms)
//   2. this home, from its reading: the element it lacks, matched to the season, and where to put things (its low side)
// Themes are decoration and refresh ideas, non-religious, never a promise about money, health or luck.
// It changes every Monday. Korean and English; built in the language that is on.
window.PUNGSU_SEASONS = (function () {
  const I = window.GILJI_I18N;
  const en = () => I && I.isEn();
  const L = (x) => (Array.isArray(x) ? x[en() ? 1 : 0] : x);

  // lunar holidays (Seollal, Chuseok) move every year
  const SEOLLAL = { 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3] };
  const CHUSEOK = { 2026: [9, 25], 2027: [9, 15], 2028: [10, 3], 2029: [9, 22], 2030: [9, 12] };
  const day = (y, m, d) => new Date(y, m - 1, d);
  const thanksgiving = (y) => { const d = day(y, 11, 1); return day(y, 11, 1 + ((4 - d.getDay() + 7) % 7) + 21); };

  // ---- holidays: [start, end] window around the day; a holiday in this week wins over the 절기 ----
  const HOLIDAYS = [   // in priority order
    { id: "christmas", emoji: "🎄", win: (y) => [day(y, 12, 14), day(y, 12, 26)], season: "winter",
      title: ["크리스마스, 반짝이는 집으로", "The holidays: a sparkling home"],
      why: ["해가 가장 짧은 때라 풍수에서는 빛과 초록으로 집에 생기를 더하라고 해요. 반짝이는 불빛은 밝은 양(陽)의 기운을, 상록 가지는 목(木)의 기운을 더해요.",
            "These are the darkest weeks of the year, so feng shui says to bring life in with light and greenery. Twinkling lights add bright yang energy, and evergreens add wood energy."],
      steps: [["현관 문에 상록 가지나 솔방울로 만든 리스를 걸어 보세요.", "창가와 거실에 따뜻한 색 꼬마전구를 둘러 주세요.", "산타, 루돌프, 눈사람 같은 귀여운 소품은 거실에 모아 두면 즐거운 기운이 모여요."],
              ["Hang a wreath of evergreen branches or pinecones on the front door.", "String warm-white twinkle lights by the windows and in the living room.", "Group cute pieces like Santa, reindeer, elves and snowmen in the living room for a cheerful corner."]] },
    { id: "thanksgiving", emoji: "🦃", win: (y) => { const t = thanksgiving(y); return [day(y, 11, t.getDate() - 7), day(y, 11, t.getDate() + 1)]; }, season: "autumn",
      title: ["추수감사절, 감사의 식탁을 차려요", "Thanksgiving: a table of thanks"],
      why: ["추수감사절은 함께 모여 감사하는 날이에요. 풍수에서는 식탁을 가족의 기운이 모이는 자리로 보고, 둥글고 풍성한 것으로 채우라고 해요. 박씨의 박처럼 둥근 박과 호박이 잘 어울려요.",
            "Thanksgiving is about gathering and giving thanks. Feng shui sees the dining table as where a family's energy gathers, and likes it filled with round, plentiful things, like gourds and squash."],
      steps: [["식탁 가운데에 작은 박, 호박, 솔방울을 둥글게 놓아 보세요.", "따뜻한 색 조명이나 초 모양 램프로 식탁을 밝혀 주세요.", "모이기 전 현관과 식탁 주변을 넓게 비워 두세요."],
              ["Arrange small gourds, squash and pinecones in a ring at the center of the table.", "Light the table with warm lamps or candle-style lights.", "Clear the entry and the space around the table before everyone arrives."]] },
    { id: "halloween", emoji: "🎃", win: (y) => [day(y, 10, 20), day(y, 10, 31)], season: "autumn",
      title: ["할로윈, 현관을 따뜻하게 꾸며요", "Halloween: a warm, friendly entry"],
      why: ["현관은 기운이 들어오는 입구예요. 풍수에서는 밝고 반가운 현관을 좋게 봐서, 무서운 장식보다 따뜻한 불빛과 둥근 호박이 잘 어울려요.",
            "The front door is where energy comes in. Feng shui likes a bright, welcoming entry, so warm lights and round pumpkins suit it better than scary props."],
      steps: [["현관 앞에 둥근 호박과 가을 화분을 두세요.", "현관 조명은 따뜻한 주황빛으로 밝게 켜 두세요.", "뾰족하거나 무서운 장식은 문 정면을 피해 옆에 두세요."],
              ["Set round pumpkins and autumn plants by the front door.", "Keep the entry light on, in a warm orange glow.", "Put sharp or spooky props off to the side, not facing the door."]] },
    { id: "chuseok", emoji: "🌕", win: (y) => CHUSEOK[y] && [day(y, CHUSEOK[y][0], CHUSEOK[y][1] - 4), day(y, CHUSEOK[y][0], CHUSEOK[y][1] + 1)], season: "autumn",
      title: ["추석, 넉넉한 식탁을 차려요", "Chuseok: a table full of harvest"],
      why: ["추석은 한 해의 결실에 감사하는 때예요. 풍수에서는 둥글고 풍성한 것을 기운이 모이는 모양으로 봐요.",
            "Chuseok is a time to give thanks for the year's harvest. Feng shui sees round, plentiful things as a shape that gathers energy."],
      steps: [["식탁에 둥근 그릇에 담은 햇과일을 올려 두세요.", "보름달처럼 둥근 조명이나 등을 켜 보세요.", "손님이 오기 전 현관을 밝고 넓게 비워 주세요."],
              ["Put fresh fruit in a round bowl on the table.", "Turn on a round lamp or lantern, like the full moon.", "Clear the entry so it's bright and roomy before guests arrive."]] },
    { id: "seollal", emoji: "🧧", win: (y) => SEOLLAL[y] && [day(y, SEOLLAL[y][0], SEOLLAL[y][1] - 4), day(y, SEOLLAL[y][0], SEOLLAL[y][1] + 1)], season: "winter",
      title: ["설날, 깨끗한 집으로 맞아요", "Seollal: welcome the Lunar New Year"],
      why: ["설 전에 집을 쓸고 닦는 것은 지난해의 묵은 기운을 내보내는 오랜 풍습이에요. 붉은색과 금색은 밝은 기운을 부른다고 봐요.",
            "Cleaning before the Lunar New Year is an old custom for sending last year's stale energy out. Red and gold are said to call in bright energy."],
      steps: [["설 전날까지 집 안 구석구석을 쓸고 닦아 주세요.", "현관이나 거실에 붉은색과 금색 소품을 하나 두세요.", "복주머니나 매듭 장식을 현관 쪽에 걸어 보세요."],
              ["Sweep and wipe every corner before the holiday.", "Put one red-and-gold piece in the entry or living room.", "Hang a lucky pouch or knot ornament near the door."]] },
    { id: "newyear", emoji: "🎆", win: (y) => [day(y - 1, 12, 27), day(y, 1, 6)], season: "winter",
      title: ["새해, 집을 새로 열어요", "New Year: open the home fresh"],
      why: ["풍수에서는 새해 첫 기운이 현관으로 들어온다고 봐요. 묵은 것을 비우고 현관을 밝히면 새 기운이 들어올 자리가 생겨요.",
            "Feng shui says the first energy of the year comes in through the front door. Clearing out the old and brightening the entry makes room for the new."],
      steps: [["현관 신발장과 바닥을 비우고 닦아 주세요.", "현관에 새 매트나 밝은 조명을 하나 더해 보세요.", "올해 바라는 것을 적은 카드를 거실에 걸어 두어도 좋아요."],
              ["Clear out and wipe down the shoe rack and entry floor.", "Add a new doormat or one more bright light at the entry.", "Hang a card in the living room with what you hope for this year."]] },
    { id: "backtoschool", emoji: "🎒", win: (y) => [day(y, 8, 15), day(y, 8, 29)], season: "summer",
      title: ["새 학기, 공부 자리를 정리해요", "Back to school: set up the study spot"],
      why: ["풍수에서는 책상 뒤에 벽이 있고 문이 비스듬히 보이는 자리를 마음이 놓이는 자리로 봐요. 새 학기에 맞춰 자리를 다시 잡아 주세요.",
            "Feng shui calls a desk with a wall behind it and the door in view, at an angle, a settled spot. A new school year is a good time to reset it."],
      steps: [["책상은 등 뒤에 벽이 오게, 문은 비스듬히 보이게 두세요.", "책상 위는 비우고 밝은 스탠드를 왼쪽 앞에 두세요.", "작은 초록 화분 하나를 책상 가까이에 두면 좋아요."],
              ["Set the desk with a wall behind it and the door in view at an angle.", "Clear the desktop and put a bright lamp at the front left.", "A small green plant near the desk is a nice touch."]] },
  ];

  // ---- the 24 절기: one short theme each (approximate dates; they move a day or so between years) ----
  const JEOLGI = [
    [1, 5, "sohan", "❄️", "winter", ["소한, 가장 추운 때", "Minor Cold: the coldest stretch"], ["찬 기운이 깊어질수록 집 안의 따뜻한 기운을 지켜야 한다고 봐요.", "As the cold deepens, feng shui says to guard the home's warmth."],
      [["창틈과 문틈을 막아 주세요.", "바닥에 두꺼운 러그를 깔아 보세요."], ["Seal window and door gaps.", "Lay down a thick rug."]]],
    [1, 20, "daehan", "🧣", "winter", ["대한, 겨울의 끝자락", "Major Cold: the end of winter"], ["겨울의 마지막 고비예요. 따뜻한 색과 부드러운 천이 집의 기운을 데워 준다고 봐요.", "The last stretch of winter. Warm colors and soft fabrics are said to warm a home's energy."],
      [["쿠션과 담요를 따뜻한 색으로 바꿔 보세요.", "가족이 모이는 거실 조명을 밝혀 주세요."], ["Switch cushions and throws to warm colors.", "Brighten the living room where everyone gathers."]]],
    [2, 4, "ipchun", "🌱", "spring", ["입춘, 봄이 들어서요", "Ipchun: spring begins"], ["봄이 들어서는 날, 현관에 '입춘대길'을 붙여 새해의 좋은 기운을 맞는 풍습이 있어요.", "On the first day of spring, Koreans put up an 'Ipchun Daegil' sign at the door to welcome the new year's good energy."],
      [["현관 문 위에 '입춘대길 건양다경' 글귀를 붙여 보세요.", "현관을 비우고 신발을 정리해 주세요."], ["Put an 'Ipchun Daegil' spring greeting above the front door.", "Clear the entry and tidy the shoes."]]],
    [2, 19, "usu", "🌧️", "spring", ["우수, 눈이 비로 바뀌어요", "Rain Water: snow turns to rain"], ["얼었던 기운이 풀리는 때예요. 습기가 차기 쉬우니 환기로 기운을 돌게 해요.", "Frozen energy starts to thaw. Damp builds easily, so airing out keeps energy moving."],
      [["맑은 날 아침에 창을 열어 환기해 주세요.", "현관과 욕실 물기를 닦아 주세요."], ["Open the windows on clear mornings.", "Wipe up water in the entry and bathroom."]]],
    [3, 5, "gyeongchip", "🐸", "spring", ["경칩, 겨울잠에서 깨어나요", "Insects Awaken"], ["만물이 깨어나는 때라 묵은 것을 정리하면 새 기운이 들어온다고 봐요.", "Everything wakes up now, so clearing out old things makes room for new energy."],
      [["겨울옷과 이불을 정리해 넣어 주세요.", "안 쓰는 물건 다섯 개를 골라 비워 보세요."], ["Put away winter clothes and heavy bedding.", "Pick five things you don't use and let them go."]]],
    [3, 20, "chunbun", "⚖️", "spring", ["춘분, 낮과 밤이 같아요", "Spring Equinox: day equals night"], ["음과 양이 균형을 이루는 날이에요. 집 안의 균형을 다시 맞추기 좋은 때예요.", "Yin and yang are in balance today, a good time to rebalance the home."],
      [["거실 가구의 양쪽 균형을 다시 맞춰 보세요.", "밝은 곳과 어두운 곳의 조명을 고르게 해 주세요."], ["Rebalance the living room so both sides feel even.", "Even out the lighting between bright and dim corners."]]],
    [4, 4, "cheongmyeong", "🌸", "spring", ["청명, 하늘이 맑아져요", "Clear and Bright"], ["하늘이 맑고 밝아지는 때예요. 창을 닦아 빛을 들이면 집에 생기가 돌아요.", "The sky turns clear and bright. Clean windows let the light, and life, back in."],
      [["창문을 안팎으로 닦아 주세요.", "봄꽃 한 다발을 식탁에 두세요."], ["Wash the windows inside and out.", "Put a bunch of spring flowers on the table."]]],
    [4, 20, "gogu", "🌾", "spring", ["곡우, 봄비가 내려요", "Grain Rain"], ["봄비가 곡식을 키우는 때예요. 화분을 돌보며 자라는 기운을 집에 들여요.", "Spring rain helps things grow. Tending plants brings that growing energy indoors."],
      [["화분 흙을 갈고 새 화분 하나를 들여 보세요.", "창가 화분에 볕이 고루 들게 돌려 주세요."], ["Repot a plant or bring in a new one.", "Turn windowsill plants so they get even light."]]],
    [5, 5, "ipha", "☀️", "summer", ["입하, 여름이 들어서요", "Summer begins"], ["화(火)의 계절이 시작돼요. 집을 가볍고 시원하게 바꿔 기운이 잘 돌게 해요.", "The fire season begins. Lighter, cooler fabrics keep energy flowing."],
      [["두꺼운 커튼을 얇고 밝은 것으로 바꿔 보세요.", "러그를 면이나 라탄으로 바꿔 보세요."], ["Swap heavy curtains for light, bright ones.", "Switch to a cotton or rattan rug."]]],
    [5, 21, "soman", "🍃", "summer", ["소만, 초록이 짙어져요", "Grain Fills"], ["초록이 가득 차는 때예요. 식물이 많아지는 만큼 바람길도 열어 줘요.", "Green fills everything now. As plants grow, keep the airflow open too."],
      [["화분 사이에 바람이 통하게 간격을 두세요.", "시든 잎은 바로 정리해 주세요."], ["Space plants so air can pass between them.", "Trim dry leaves right away."]]],
    [6, 5, "mangjong", "🌿", "summer", ["망종, 씨를 뿌려요", "Grain in Ear"], ["씨를 뿌리는 때예요. 새로 시작하고 싶은 일을 위한 자리를 하나 만들어 보세요.", "It's planting time. Make one spot for something you want to start."],
      [["책상이나 선반 한 칸을 새 계획을 위한 자리로 비워 보세요.", "작은 씨앗 화분을 하나 키워 보세요."], ["Clear a shelf or desk corner for a new plan.", "Start a small pot of seeds."]]],
    [6, 21, "haji", "🌞", "summer", ["하지, 해가 가장 길어요", "Summer Solstice"], ["양의 기운이 가장 센 날이에요. 강한 볕은 가려 주고 시원한 색으로 균형을 맞춰요.", "Yang energy peaks today. Soften the strong sun and balance it with cool colors."],
      [["서쪽 창에는 오후 볕을 가리는 블라인드를 쳐 주세요.", "파랑이나 흰색 소품으로 시원하게 바꿔 보세요."], ["Draw blinds on west windows against the afternoon sun.", "Add blue or white pieces for a cooler feel."]]],
    [7, 7, "soseo", "🎐", "summer", ["소서, 더위가 시작돼요", "Minor Heat"], ["더위와 습기가 함께 오는 때예요. 바람이 지나는 길을 만들어 기운을 돌게 해요.", "Heat and damp arrive together. A clear path for the breeze keeps energy moving."],
      [["마주 보는 창을 함께 열어 맞바람을 만들어 주세요.", "창가에 풍경을 달아 바람을 느껴 보세요."], ["Open windows on opposite sides for a cross breeze.", "Hang a wind chime by a window."]]],
    [7, 22, "daeseo", "🍉", "summer", ["대서, 가장 더울 때", "Major Heat"], ["가장 덥고 습한 때예요. 습기가 고이면 기운도 무거워진다고 봐요.", "The hottest, dampest stretch. When damp builds up, energy feels heavy."],
      [["옷장과 신발장에 제습제를 넣어 주세요.", "욕실 문은 쓰고 나서 열어 두세요."], ["Put moisture absorbers in closets and the shoe cabinet.", "Leave the bathroom door open after use."]]],
    [8, 7, "ipchu", "🍂", "autumn", ["입추, 가을이 들어서요", "Autumn begins"], ["금(金)의 계절이 시작돼요. 정리하고 비우는 기운이 커지는 때예요.", "The metal season begins, a time when clearing and sorting comes naturally."],
      [["여름 물건을 정리해 넣어 주세요.", "서랍 하나를 골라 깔끔하게 비워 보세요."], ["Pack away summer things.", "Pick one drawer and clear it out."]]],
    [8, 23, "cheoseo", "🌬️", "autumn", ["처서, 더위가 물러가요", "Heat Ends"], ["더위가 물러가고 선선한 바람이 드는 때예요. 집 안 공기를 새로 바꿔요.", "The heat fades and a cool breeze comes in. Refresh the air at home."],
      [["이불과 베개를 볕에 말려 주세요.", "에어컨 필터를 청소해 주세요."], ["Air out the bedding in the sun.", "Clean the air conditioner filters."]]],
    [9, 7, "baengno", "💧", "autumn", ["백로, 이슬이 맺혀요", "White Dew"], ["아침저녁이 서늘해지는 때예요. 따뜻한 색을 조금씩 더해 균형을 맞춰요.", "Mornings and evenings turn cool. Add warm colors little by little."],
      [["얇은 담요를 소파에 하나 올려 두세요.", "조명을 조금 더 따뜻한 색으로 바꿔 보세요."], ["Put a light throw on the sofa.", "Switch to slightly warmer light bulbs."]]],
    [9, 22, "chubun", "🍁", "autumn", ["추분, 밤이 길어지기 시작해요", "Autumn Equinox"], ["다시 낮과 밤이 같아지는 날이에요. 밤이 길어지니 저녁 조명을 챙겨요.", "Day and night are even again. Nights grow longer, so plan your evening light."],
      [["거실에 따뜻한 스탠드 조명을 하나 더해 보세요.", "가을 열매나 단풍 가지를 꽂아 두세요."], ["Add one warm floor or table lamp in the living room.", "Put out autumn berries or fall branches."]]],
    [10, 8, "hallo", "🌰", "autumn", ["한로, 찬 이슬이 내려요", "Cold Dew"], ["찬 기운이 들기 시작해요. 바람이 드는 쪽을 미리 챙겨 두면 좋아요.", "The cold starts to creep in. Get ahead of the windy side."],
      [["바람이 드는 쪽 창의 틈을 살펴보세요.", "두꺼운 커튼을 꺼내 준비해 두세요."], ["Check the gaps on the windy side's windows.", "Get the thick curtains ready."]]],
    [10, 23, "sanggang", "🍠", "autumn", ["상강, 서리가 내려요", "Frost Descends"], ["서리가 내리는 때예요. 흙빛과 나무 소품이 집을 포근하게 감싸 준다고 봐요.", "Frost arrives. Earthy tones and wood make a home feel snug."],
      [["쿠션과 러그를 황토나 갈색으로 바꿔 보세요.", "나무 그릇이나 바구니로 거실을 채워 보세요."], ["Switch cushions and rugs to ochre or brown.", "Add wooden bowls or baskets in the living room."]]],
    [11, 7, "ipdong", "🧤", "winter", ["입동, 겨울이 들어서요", "Winter begins"], ["수(水)의 계절이 시작돼요. 겨울을 맞아 집 안의 따뜻한 기운을 지킬 준비를 해요.", "The water season begins. Get the home ready to hold its warmth."],
      [["현관에 두꺼운 매트를 깔아 주세요.", "침대는 창에서 조금 떨어뜨려 주세요."], ["Lay a thick mat at the entry.", "Move the bed a little away from the window."]]],
    [11, 22, "soseol", "🌨️", "winter", ["소설, 첫눈이 와요", "Minor Snow"], ["첫눈이 오는 때예요. 해가 짧아지니 빛으로 집에 생기를 더해요.", "First snow season. Days are short, so add light to keep the home lively."],
      [["해가 지기 전에 거실 조명을 켜 두세요.", "현관에 따뜻한 색 조명을 더해 보세요."], ["Turn the living room lights on before sunset.", "Add a warm-colored light at the entry."]]],
    [12, 7, "daeseol", "☃️", "winter", ["대설, 눈이 많이 와요", "Major Snow"], ["눈이 쌓이는 때예요. 하얀 바깥과 어울리게 집 안은 따뜻하고 밝게 채워요.", "Snow piles up outside. Fill the inside with warmth and light to match."],
      [["창가에 하얀 눈송이나 솔방울 장식을 두어 보세요.", "소파에 니트 담요를 올려 두세요."], ["Put snowflake or pinecone decorations by the window.", "Lay a knit throw on the sofa."]]],
    [12, 21, "dongji", "🥣", "winter", ["동지, 밤이 가장 길어요", "Winter Solstice"], ["밤이 가장 긴 날, 팥죽을 쑤어 나쁜 기운을 쫓던 풍습이 있어요. 이날부터 해가 다시 길어져요.", "On the longest night, Koreans made red bean porridge to chase off bad energy. From today the days grow longer again."],
      [["팥죽 한 그릇이나 붉은 소품으로 동지를 챙겨 보세요.", "집 안 가장 어두운 구석에 불을 하나 밝혀 주세요."], ["Mark the day with red bean porridge or a red accent.", "Light up the darkest corner of the home."]]],
  ];

  // ---- this home: the missing element, matched to the season (5 x 4) ----
  const EL = {
    wood: { spring: ["봄꽃이나 새순이 난 가지를 꽂아 목의 기운을 채워요", "add spring flowers or budding branches for wood"],
            summer: ["잎이 큰 초록 화분으로 목의 기운을 채워요", "add a big-leafed green plant for wood"],
            autumn: ["나무 그릇과 솔방울로 목의 기운을 채워요", "add wooden bowls and pinecones for wood"],
            winter: ["상록 가지나 작은 소나무 화분으로 목의 기운을 채워요", "add evergreen branches or a small pine for wood"] },
    fire: { spring: ["분홍이나 주황 봄꽃으로 화의 기운을 채워요", "add pink or orange spring flowers for fire"],
            summer: ["붉은 과일 한 그릇으로 화의 기운을 채워요", "add a bowl of red fruit for fire"],
            autumn: ["따뜻한 주황빛 조명으로 화의 기운을 채워요", "add warm orange light for fire"],
            winter: ["붉은 리본과 따뜻한 꼬마전구로 화의 기운을 채워요", "add red ribbon and warm twinkle lights for fire"] },
    earth: { spring: ["도자기 화병으로 토의 기운을 채워요", "add a ceramic vase for earth"],
             summer: ["황토색 라탄이나 면 소품으로 토의 기운을 채워요", "add ochre rattan or cotton pieces for earth"],
             autumn: ["호박이나 박 같은 둥근 황토빛 장식으로 토의 기운을 채워요", "add round ochre gourds or squash for earth"],
             winter: ["베이지 니트와 도자기 소품으로 토의 기운을 채워요", "add beige knits and pottery for earth"] },
    metal: { spring: ["흰 꽃과 은빛 화병으로 금의 기운을 채워요", "add white flowers in a silver vase for metal"],
             summer: ["흰색 패브릭과 둥근 금속 소품으로 금의 기운을 채워요", "add white fabrics and a round metal piece for metal"],
             autumn: ["금빛 촛대나 둥근 금속 쟁반으로 금의 기운을 채워요", "add a gold candleholder or round metal tray for metal"],
             winter: ["은빛 방울 장식이나 흰 눈송이로 금의 기운을 채워요", "add silver ornaments or white snowflakes for metal"] },
    water: { spring: ["유리 화병에 물을 담아 꽃을 꽂아 수의 기운을 채워요", "add flowers in a clear glass vase for water"],
             summer: ["파란 유리 소품이나 작은 수반으로 수의 기운을 채워요", "add blue glass or a small tabletop fountain for water"],
             autumn: ["남색 쿠션이나 물결무늬 천으로 수의 기운을 채워요", "add a navy cushion or wave-patterned fabric for water"],
             winter: ["짙은 남색 리본과 유리 장식으로 수의 기운을 채워요", "add deep navy ribbon and glass ornaments for water"] },
  };
  const ORDER = ["wood", "fire", "earth", "metal", "water"];
  const DIR = { ko: ["북", "북동", "동", "남동", "남", "남서", "서", "북서"], en: ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"] };
  const dir = (b) => DIR[en() ? "en" : "ko"][Math.floor((((b % 360) + 360) % 360) / 45 + 0.5 - 1e-9) % 8];

  function monday(date) { const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; }
  function moment(date) {
    const mon = monday(date), sun = new Date(mon); sun.setDate(mon.getDate() + 6);
    for (const h of HOLIDAYS) for (const y of [mon.getFullYear(), mon.getFullYear() + 1]) {
      const w = h.win(y); if (w && w[0] <= sun && w[1] >= mon) return { kind: "holiday", ...h };
    }
    // otherwise the 절기 in effect at mid-week
    const mid = new Date(mon); mid.setDate(mon.getDate() + 3);
    const m = mid.getMonth() + 1, d = mid.getDate();
    let j = JEOLGI[JEOLGI.length - 1];
    JEOLGI.forEach((x) => { if (m > x[0] || (m === x[0] && d >= x[1])) j = x; });
    return { kind: "jeolgi", id: j[2], emoji: j[3], season: j[4], title: j[5], why: j[6], steps: j[7] };
  }

  // this home's part: the element it lacks (or has least of), and where to put things (its low side, else the entry)
  function homePart(r, season) {
    const v = ORDER.map((k) => (r.ohaeng || {})[k] || 0), low = ORDER[v.indexOf(Math.min(...v))];
    const enc = r.score.components.enclosure.facts, f = r.site.facing_deg;
    const side = enc.weak_side === "cheongryong" ? { ko: `왼쪽(${dir(f - 90)}쪽)`, en: `left side (the ${dir(f - 90)})` }
      : enc.weak_side === "baekho" ? { ko: `오른쪽(${dir(f + 90)}쪽)`, en: `right side (the ${dir(f + 90)})` } : null;
    const el = EL[low][season][en() ? 1 : 0];
    const missing = v[ORDER.indexOf(low)] === 0;
    const lead = missing ? (en() ? `This home has no ${low} around it, so` : "이 집 주변에는 " + { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" }[low] + "의 기운이 없어서,")
                         : (en() ? `This home has the least ${low} around it, so` : "이 집 주변에는 " + { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" }[low] + "의 기운이 가장 적어서,");
    const where = side ? (en() ? ` Put it on the home's ${side.en}, where the land is low, to even things out.` : ` 장식은 땅이 낮은 ${side.ko}에 두면 그쪽을 받쳐 줘요.`)
                       : (en() ? " Put it near the front door, where energy comes in." : " 장식은 기운이 들어오는 현관 가까이에 두세요.");
    return { element: low, line: `${lead} ${el}.${where}` };
  }

  function weekly(r, date) {
    const mo = moment(date), hp = homePart(r, mo.season);
    let steps = L(mo.steps);
    // 동지 (Dec 21–22) always falls in a holiday week, so that week's tip carries its custom too
    const mon = monday(date), dj = new Date(mon.getFullYear(), 11, 21);
    if (mo.kind === "holiday" && dj >= mon && dj <= new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 6))
      steps = [...steps, L(["이번 주에는 밤이 가장 긴 동지도 있어요. 팥죽 한 그릇이나 붉은 소품으로 챙겨 보세요.", "This week also has the winter solstice, the longest night. Koreans mark it with red bean porridge or a red accent."])];
    // a soft 3D picture: the holiday's own, or the season's for a 절기 week
    const pic = `img/season/${mo.kind === "holiday" ? mo.id : mo.season}.webp`;
    return { id: mo.id, kind: mo.kind, emoji: mo.emoji, pic, title: L(mo.title), why: L(mo.why), steps, home: hp.line, element: hp.element,
             weekOf: monday(date) };
  }
  return { weekly, moment, HOLIDAYS, JEOLGI };
})();
