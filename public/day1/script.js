/* Cosmic void starfield — drifting dust with a subtle parallax tilt. */

(function () {
  const canvas = document.getElementById('void-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STAR_COLORS = ['#FFFFFF', '#BFE9FF', '#00F0FF', '#C9A6FF'];

  let width = 0;
  let height = 0;
  let stars = [];
  let pointerX = 0;
  let pointerY = 0;
  let driftX = 0;
  let driftY = 0;
  let frame = null;

  function starCount() {
    // Keep the density sane on phones and on ultrawide monitors alike.
    return Math.min(260, Math.max(70, Math.round((width * height) / 9000)));
  }

  function makeStar() {
    const depth = Math.random() * 0.8 + 0.2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      depth: depth,
      radius: depth * 1.4 + 0.2,
      speed: depth * 0.22 + 0.03,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleRate: Math.random() * 0.02 + 0.005
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = [];
    for (let i = 0; i < starCount(); i++) stars.push(makeStar());
  }

  function drawStar(star, alpha, offsetX, offsetY) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Ease the parallax toward the pointer so the drift never snaps.
    driftX += (pointerX - driftX) * 0.04;
    driftY += (pointerY - driftY) * 0.04;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      if (!reduceMotion) {
        star.y -= star.speed;
        star.twinkle += star.twinkleRate;
        if (star.y < -2) {
          star.y = height + 2;
          star.x = Math.random() * width;
        }
      }

      const alpha = (0.35 + Math.sin(star.twinkle) * 0.3) * star.depth + 0.15;
      const offsetX = driftX * star.depth * 18;
      const offsetY = driftY * star.depth * 18;

      // Brighter stars get a soft halo; the faint dust stays flat and cheap.
      if (star.radius > 1) {
        ctx.shadowBlur = star.radius * 6;
        ctx.shadowColor = star.color;
      } else {
        ctx.shadowBlur = 0;
      }

      drawStar(star, Math.min(alpha, 1), offsetX, offsetY);
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    frame = window.requestAnimationFrame(render);
  }

  function onPointerMove(event) {
    const point = event.touches ? event.touches[0] : event;
    if (!point) return;
    pointerX = (point.clientX / width) * 2 - 1;
    pointerY = (point.clientY / height) * 2 - 1;
  }

  function start() {
    if (frame === null) frame = window.requestAnimationFrame(render);
  }

  function stop() {
    if (frame !== null) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  });

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // Pause the loop while the tab is hidden instead of burning frames.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else start();
  });

  resize();
  start();
})();
