// First sketches of the two characters (decision 2026-11-01): 두꺼비 터주 reads the land, 제비 흥이 brings
// the daily 박씨 (one 보완법 tip). Original designs from 민화-style flat shapes; final art should come from an
// illustrator. Colors are fixed (not theme tokens) so the characters look the same in dark mode.
window.PUNGSU_CHARS = (function () {
  const INK = "#3a332d", CREAM = "#fbf3e4", BLUSH = "#e9a08a";

  function toad(size = 96, opts = {}) {
    const body = "#9bb08a", dark = "#7d9470", coin = "#d9b25f";
    return `<svg width="${size}" height="${Math.round(size * 0.86)}" viewBox="0 0 120 103" role="img" aria-label="두꺼비 터주" class="${opts.cls || ""}">
      <g stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
        <ellipse cx="22" cy="90" rx="13" ry="7" fill="${body}"/>
        <ellipse cx="98" cy="90" rx="13" ry="7" fill="${body}"/>
        <path d="M14 76 C10 48 34 30 60 30 C86 30 110 48 106 76 C103 92 84 97 60 97 C36 97 17 92 14 76 Z" fill="${body}"/>
        <ellipse cx="60" cy="80" rx="27" ry="15" fill="${CREAM}"/>
        <circle cx="39" cy="31" r="14" fill="${body}"/>
        <circle cx="81" cy="31" r="14" fill="${body}"/>
        <circle cx="39" cy="30" r="8.5" fill="#fff"/>
        <circle cx="81" cy="30" r="8.5" fill="#fff"/>
      </g>
      <circle cx="40.5" cy="31" r="4.6" fill="${INK}"/><circle cx="82.5" cy="31" r="4.6" fill="${INK}"/>
      <circle cx="42.3" cy="29" r="1.6" fill="#fff"/><circle cx="84.3" cy="29" r="1.6" fill="#fff"/>
      <g fill="${dark}"><circle cx="27" cy="62" r="3"/><circle cx="34" cy="53" r="2.2"/><circle cx="93" cy="62" r="3"/><circle cx="86" cy="53" r="2.2"/><circle cx="60" cy="40" r="2"/></g>
      <ellipse cx="33" cy="63" rx="6" ry="3.6" fill="${BLUSH}" opacity=".75"/>
      <ellipse cx="87" cy="63" rx="6" ry="3.6" fill="${BLUSH}" opacity=".75"/>
      <path d="M46 57 Q60 67 74 57" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
        <circle cx="60" cy="84" r="10.5" fill="${coin}"/>
        <rect x="56.2" y="80.2" width="7.6" height="7.6" rx="1" fill="${CREAM}"/>
        <ellipse cx="46" cy="86" rx="7" ry="5" fill="${body}"/>
        <ellipse cx="74" cy="86" rx="7" ry="5" fill="${body}"/>
      </g>
    </svg>`;
  }

  function swallow(size = 72, opts = {}) {
    const back = "#3f4f6e", throat = "#d1765c", seed = "#d9b25f";
    return `<svg width="${size}" height="${Math.round(size * 0.78)}" viewBox="0 0 120 94" role="img" aria-label="제비 흥이" class="${opts.cls || ""}">
      <g stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
        <path d="M44 58 L6 78 L26 60 L4 62 L40 50 Z" fill="${back}"/>
        <path d="M30 52 C34 34 56 26 76 30 C92 33 98 46 94 58 C88 72 66 76 50 70 C40 66 32 60 30 52 Z" fill="${back}"/>
        <path d="M46 64 C56 72 78 72 90 60 C88 70 70 78 56 74 C50 72 47 68 46 64 Z" fill="${CREAM}"/>
        <path d="M58 44 C50 22 64 6 84 4 C76 14 74 28 70 40 Z" fill="${back}"/>
        <circle cx="86" cy="40" r="15" fill="${back}"/>
        <path d="M80 50 C84 56 94 56 98 48 C96 44 86 44 80 50 Z" fill="${throat}"/>
        <path d="M99 39 L112 42 L99 46 Z" fill="${seed}"/>
        <ellipse cx="114" cy="42" rx="5" ry="3.6" fill="${seed}"/>
      </g>
      <circle cx="90" cy="37" r="5.2" fill="#fff"/><circle cx="91.2" cy="37.4" r="3" fill="${INK}"/><circle cx="92.2" cy="36.2" r="1.1" fill="#fff"/>
      <ellipse cx="83" cy="46" rx="4" ry="2.4" fill="${BLUSH}" opacity=".8"/>
    </svg>`;
  }

  return { toad, swallow };
})();
