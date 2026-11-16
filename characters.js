// 두꺼비 터주 reads the land; 제비 흥이 brings the daily 박씨 (one 보완법 tip). Soft 3D art made in Figma
// (file "Gilji characters", Nov 16, 2026), cut out to transparent WebP in img/. Each character has three
// poses: toad hello / think / yay, swallow fly / hello / yay. `size` is the image height in px.
window.PUNGSU_CHARS = (function () {
  const tr = (ko, en) => (window.GILJI_I18N ? GILJI_I18N.t({ ko, en }) : ko);
  const NAME = { toad: () => tr("두꺼비 터주", "Teoju the toad"), swallow: () => tr("제비 흥이", "Heungi the swallow") };
  const img = (who, pose, size, cls) =>
    `<img src="img/${who}-${pose}.webp" alt="${NAME[who]()}" class="char ${cls || ""}" style="height:${size}px;width:auto" draggable="false">`;
  function toad(size = 96, opts = {}) { return img("toad", opts.pose || "hello", Math.round(size * 1.15), opts.cls); }
  function swallow(size = 72, opts = {}) { return img("swallow", opts.pose || "fly", Math.round(size * 0.9), opts.cls); }
  return { toad, swallow };
})();
