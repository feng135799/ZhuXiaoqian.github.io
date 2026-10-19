// Progressive enhancement only: all globe, ring and light animations use CSS.
// Honors reduced-motion preferences; no dependencies, analytics or network requests.
(() => {
  'use strict';
  const visual = document.getElementById('science-visual');

  // Optional static frame mode for preview GIF generation.
  const params = new URLSearchParams(window.location.search);
  const frameParam = params.get('frame');
  if (frameParam !== null) {
    const t = parseFloat(frameParam);
    if (!Number.isNaN(t)) {
      document.documentElement.classList.add('frame-capture');
      document.documentElement.style.setProperty('--frame-seconds', String(t));
    }
  }
  if (!visual || !window.matchMedia) return;
  const allowPointer = window.matchMedia('(hover:hover) and (pointer:fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!allowPointer.matches || reduceMotion.matches) return;
  const stage = visual.querySelector('.visual-motion');
  if (!stage) return;
  let frame = 0;
  let x = 0;
  let y = 0;
  const update = () => {
    stage.style.setProperty('--parallax-x', `${x.toFixed(2)}px`);
    stage.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
    frame = 0;
  };
  visual.addEventListener('pointermove', ev => {
    const bounds = visual.getBoundingClientRect();
    x = ((ev.clientX - bounds.left) / bounds.width - .5) * 17;
    y = ((ev.clientY - bounds.top) / bounds.height - .5) * 17;
    if (!frame) frame = requestAnimationFrame(update);
  }, {passive: true});
  visual.addEventListener('pointerleave', () => {
    x = 0;
    y = 0;
    if (!frame) frame = requestAnimationFrame(update);
  });
})();
