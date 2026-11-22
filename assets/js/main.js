(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DICT = window.I18N;
  const MR_DIGITS = '०१२३४५६७८९';

  /* ================= Language ================= */
  let lang = 'en';
  try { lang = localStorage.getItem('wedding-lang') || ''; } catch (e) { lang = ''; }
  if (!DICT[lang]) lang = (navigator.language || '').toLowerCase().startsWith('mr') ? 'mr' : 'en';
  const t = (k) => (DICT[lang] && DICT[lang][k] != null ? DICT[lang][k] : DICT.en[k] || '');
  const num = (n) => (lang === 'mr' ? String(n).replace(/\d/g, (d) => MR_DIGITS[d]) : String(n));
  const langListeners = [];

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    langListeners.forEach((fn) => fn());
  }
  function setLang(next) {
    if (next === lang || !DICT[next]) return;
    lang = next;
    try { localStorage.setItem('wedding-lang', lang); } catch (e) {}
    if (reduce) { applyLang(); return; }
    document.body.classList.add('lang-fading');
    setTimeout(() => { applyLang(); requestAnimationFrame(() => document.body.classList.remove('lang-fading')); }, 220);
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  applyLang();

  /* ================= Ornaments ================= */
  const LOTUS = '<svg viewBox="0 0 240 24"><path d="M0 12H92M148 12H240" stroke="currentColor" stroke-width="1"/>' +
    '<circle cx="96" cy="12" r="1.8" fill="currentColor"/><circle cx="144" cy="12" r="1.8" fill="currentColor"/>' +
    '<path d="M120 2C126 8 126 16 120 22C114 16 114 8 120 2Z" fill="currentColor"/>' +
    '<path d="M120 22C111 21 104 15 102 8C110 9 117 15 120 22Z" fill="none" stroke="currentColor" stroke-width="1"/>' +
    '<path d="M120 22C129 21 136 15 138 8C130 9 123 15 120 22Z" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
  $$('.divider').forEach((d) => { d.innerHTML = LOTUS; });

  (function toran() {
    const svg = $('#toran'); if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };
    svg.appendChild(mk('path', { d: 'M0 14 Q300 34 600 14', stroke: '#C6A15B', 'stroke-width': 2, fill: 'none' }));
    const n = 15;
    for (let i = 0; i <= n; i++) {
      const x = i * 600 / n, y = 14 + 20 * (1 - Math.pow((x - 300) / 300, 2));
      if (i % 2 === 0) {
        const g = mk('g', { transform: `translate(${x} ${y})` });
        [0, 14, 28].forEach((dy, j) => g.appendChild(mk('circle', { cx: 0, cy: dy + 8, r: 8 - j, fill: j === 1 ? '#F5B72A' : '#E8821C', stroke: '#B85A0C', 'stroke-width': 1 })));
        svg.appendChild(g);
      } else {
        const g = mk('g', { transform: `translate(${x} ${y}) rotate(${i % 4 === 1 ? -6 : 6})` });
        g.appendChild(mk('path', { d: 'M0 0 C14 18 13 52 0 72 C-13 52 -14 18 0 0Z', fill: '#2F6B43', stroke: '#1B4A2C', 'stroke-width': 1 }));
        g.appendChild(mk('path', { d: 'M0 4 V68', stroke: '#7DBA8C', 'stroke-width': 1, 'stroke-opacity': .6 }));
        svg.appendChild(g);
      }
    }
  })();

  (function petals() {
    const colors = ['#E8821C', '#F2A93B', '#C93A4B', '#F4C76A', '#E26D5A'];
    $$('.petals').forEach((box) => {
      for (let i = 0; i < 12; i++) {
        const s = document.createElement('span');
        s.style.cssText = `--x:${Math.random() * 100}%;--w:${8 + Math.random() * 8}px;--c:${colors[i % colors.length]};` +
          `--dur:${9 + Math.random() * 8}s;--delay:${-Math.random() * 14}s;--drift:${(Math.random() - .5) * 120}px`;
        box.appendChild(s);
      }
    });
  })();

  /* ================= Akshata shower ================= */
  const shower = (() => {
    const c = $('#shower'), x = c.getContext('2d'); let parts = [], raf = null;
    const cols = ['#F5D76E', '#F2C64F', '#FFF3C4', '#9E1B2C', '#E8821C', '#E26D5A'];
    function size() { const d = Math.min(devicePixelRatio || 1, 2); c.width = innerWidth * d; c.height = innerHeight * d; x.setTransform(d, 0, 0, d, 0, 0); }
    addEventListener('resize', size); size();
    function tick() {
      x.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter((p) => p.y < innerHeight + 20);
      for (const p of parts) {
        p.vy += 0.04; p.y += p.vy; p.x += p.vx + Math.sin(p.y / 40 + p.ph) * 0.5; p.r += p.vr;
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.beginPath();
        if (p.petal) x.ellipse(0, 0, 6, 3.4, 0, 0, 7); else x.ellipse(0, 0, 3.2, 1.4, 0, 0, 7);
        x.fill(); x.restore();
      }
      raf = parts.length ? requestAnimationFrame(tick) : null;
    }
    return function (count = 180) {
      if (reduce) return;
      for (let i = 0; i < count; i++) {
        parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .7, vx: (Math.random() - .5) * .6, vy: 1 + Math.random() * 1.5,
          r: Math.random() * 6, vr: (Math.random() - .5) * .15, ph: Math.random() * 6, c: cols[i % cols.length], petal: i % 5 === 0 });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
  })();
  $('#againBtn').addEventListener('click', () => shower(200));

  /* ================= Music ================= */
  const music = (() => {
    const a = new Audio('assets/audio/lagin-sarai.mp3'); a.loop = true; a.preload = 'none'; a.volume = 0;
    const btn = $('#musicBtn'); let on = false, fade = null;
    function ramp(to, ms, done) {
      clearInterval(fade); const from = a.volume, t0 = performance.now();
      fade = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / ms); a.volume = from + (to - from) * k; if (k >= 1) { clearInterval(fade); done && done(); } }, 40);
    }
    function set(v) {
      on = v; btn.classList.toggle('on', on); btn.setAttribute('aria-pressed', String(on));
      if (on) {
        const p = a.play();
        if (p && p.catch) p.catch(() => { on = false; btn.classList.remove('on'); btn.setAttribute('aria-pressed', 'false'); });
        ramp(.85, 1500);
      } else ramp(0, 500, () => { if (!on) a.pause(); });
    }
    btn.addEventListener('click', () => set(!on));
    document.addEventListener('visibilitychange', () => { if (document.hidden) a.pause(); else if (on) a.play().catch(() => {}); });
    return { start() { btn.hidden = false; set(true); } };
  })();

  /* ================= Opening: blessing → antarpat → hero ================= */
  const intro = $('#intro');
  document.body.classList.add('locked');
  $('#enterBtn').focus({ preventScroll: true });
  $('#enterBtn').addEventListener('click', () => {
    music.start();
    intro.classList.add('step-cloth');
    const hold = reduce ? 0 : 1500;
    setTimeout(() => { intro.classList.add('step-drop'); document.body.classList.add('opened'); shower(220); }, hold);
    setTimeout(() => { intro.classList.add('gone'); document.body.classList.remove('locked'); }, reduce ? 0 : hold + 1100);
    setTimeout(() => { intro.hidden = true; }, reduce ? 0 : hold + 2000);
  }, { once: true });

  /* ================= Scroll reveal ================= */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.rise').forEach((el) => { if (el.getBoundingClientRect().top > innerHeight * .9) { el.classList.add('pre'); io.observe(el); } });
  }

  /* ================= Scratch the betel leaf ================= */
  (function scratchLeaf() {
    const box = $('#scratchBox'), c = $('#scratch'), x = c.getContext('2d');
    const leaf = new Path2D('M150 44 C110 -2 8 14 12 108 C16 196 96 262 150 334 C204 262 284 196 288 108 C292 14 190 -2 150 44 Z');
    let done = false, drawing = false, last = null, touched = false, scale = 1;
    function paint() {
      const r = box.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      if (!r.width) return;
      c.width = r.width * d; c.height = r.height * d; scale = r.width / 300;
      x.setTransform(d * scale, 0, 0, d * scale, 0, 0);
      x.globalCompositeOperation = 'source-over';
      const g = x.createLinearGradient(0, 0, 300, 340);
      g.addColorStop(0, '#F1DDA6'); g.addColorStop(.45, '#C6A15B'); g.addColorStop(.7, '#E8D5AC'); g.addColorStop(1, '#9C7A3C');
      x.fillStyle = g; x.fill(leaf);
      x.save(); x.clip(leaf); x.strokeStyle = 'rgba(90,50,10,.22)'; x.lineWidth = 1;
      for (let i = -340; i < 340; i += 9) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 340, 340); x.stroke(); }
      x.restore();
      x.fillStyle = '#4A1425'; x.textAlign = 'center';
      x.font = lang === 'mr' ? '30px "Yatra One", serif' : 'italic 30px "Bodoni Moda", serif';
      x.fillText(t('reveal.canvas1'), 150, 170);
      x.font = lang === 'mr' ? '16px "Mukta", sans-serif' : '15px "Jost", sans-serif';
      x.fillText(t('reveal.canvas2'), 150, 198);
    }
    const pos = (e) => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale }; };
    function scratch(p) {
      touched = true;
      x.globalCompositeOperation = 'destination-out'; x.lineCap = 'round'; x.lineWidth = 38;
      x.beginPath(); x.moveTo((last || p).x, (last || p).y); x.lineTo(p.x, p.y); x.stroke();
      x.beginPath(); x.arc(p.x, p.y, 19, 0, 7); x.fill(); last = p;
    }
    function cleared() {
      const d = x.getImageData(0, 0, c.width, c.height).data; let tot = 0, clr = 0; const step = 4 * 16;
      for (let i = 3; i < d.length; i += step) {
        const px = ((i - 3) / 4) % c.width, py = Math.floor((i - 3) / 4 / c.width);
        if (x.isPointInPath(leaf, px, py)) { tot++; if (d[i] < 40) clr++; }
      }
      return tot ? clr / tot : 0;
    }
    function setDoneLabel() { if (done) $('#revealBtn').textContent = t('reveal.done'); }
    function reveal() {
      if (done) return; done = true;
      c.style.transition = 'opacity .8s'; c.style.opacity = 0; c.style.pointerEvents = 'none';
      setDoneLabel();
      const r = box.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) shower(140);
    }
    c.addEventListener('pointerdown', (e) => { drawing = true; last = null; c.setPointerCapture(e.pointerId); scratch(pos(e)); });
    c.addEventListener('pointermove', (e) => { if (drawing) scratch(pos(e)); });
    const end = () => { if (!drawing) return; drawing = false; last = null; if (cleared() > .45) reveal(); };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
    $('#revealBtn').addEventListener('click', reveal);
    let w = box.clientWidth;
    addEventListener('resize', () => { if (box.clientWidth !== w && !done) { w = box.clientWidth; touched = false; paint(); } });
    langListeners.push(() => { if (!done && !touched) paint(); setDoneLabel(); });
    paint();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!done && !touched) paint(); });
  })();

  /* ================= Countdown ================= */
  (function countdown() {
    const target = new Date('2027-01-29T11:13:00+05:30').getTime();
    const el = (k) => $('#cd-' + k), pad = (n) => String(n).padStart(2, '0');
    let finished = false;
    function tick() {
      let s = Math.floor((target - Date.now()) / 1000);
      if (s <= 0) {
        finished = true;
        ['d', 'h', 'm', 's'].forEach((k) => { el(k).textContent = num('00'); });
        $('#cd-note').textContent = t('count.done'); return false;
      }
      el('d').textContent = num(Math.floor(s / 86400)); s %= 86400;
      el('h').textContent = num(pad(Math.floor(s / 3600))); s %= 3600;
      el('m').textContent = num(pad(Math.floor(s / 60)));
      el('s').textContent = num(pad(s % 60));
      return true;
    }
    langListeners.push(() => { tick(); });
    if (tick()) { const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000); }
    void finished;
  })();

  /* ================= Lightbox ================= */
  (function lightbox() {
    const photos = [
      { src: 'assets/photos/couple-forest-moment.jpg', alt: 'alt.p2' },
      { src: 'assets/photos/couple-together.jpg', alt: 'alt.p4' },
      { src: 'assets/photos/couple-hand-in-hand.jpg', alt: 'alt.p3' },
      { src: 'assets/photos/couple-portrait-close.jpg', alt: 'alt.p1' }
    ];
    const lb = $('#lightbox'), img = $('#lbImg'), count = $('#lbCount');
    let i = 0, lastFocus = null, x0 = null;
    function show(n, instant) {
      i = (n + photos.length) % photos.length;
      const p = photos[i];
      const set = () => { img.src = p.src; img.alt = t(p.alt); count.textContent = num(i + 1) + ' / ' + num(photos.length); };
      if (instant || reduce) { set(); return; }
      img.classList.add('swap');
      setTimeout(() => { set(); const fin = () => img.classList.remove('swap'); if (img.complete) requestAnimationFrame(fin); else img.onload = fin; }, 220);
    }
    function open(n) {
      lastFocus = document.activeElement; show(n, true);
      lb.hidden = false; document.body.classList.add('locked');
      requestAnimationFrame(() => lb.classList.add('show'));
      $('.lb-close', lb).focus();
      photos.forEach((p) => { const im = new Image(); im.src = p.src; });
    }
    function close() {
      lb.classList.remove('show');
      setTimeout(() => { lb.hidden = true; }, reduce ? 0 : 300);
      if ($('#intro').hidden) document.body.classList.remove('locked');
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    $$('.ph-btn').forEach((b) => b.addEventListener('click', () => open(+b.dataset.index)));
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(i - 1));
    $('.lb-next', lb).addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(i - 1);
      else if (e.key === 'ArrowRight') show(i + 1);
      else if (e.key === 'Tab') {
        const f = $$('.lb-btn', lb); const k = f.indexOf(document.activeElement);
        e.preventDefault(); f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    const stage = $('.lb-stage', lb);
    stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    stage.addEventListener('pointerup', (e) => {
      if (x0 == null) return; const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) show(i + (dx < 0 ? 1 : -1));
    });
    langListeners.push(() => { if (!lb.hidden) { img.alt = t(photos[i].alt); count.textContent = num(i + 1) + ' / ' + num(photos.length); } });
  })();

  /* ================= Scroll: progress, parallax, back-to-top ================= */
  (function scrollFx() {
    const bar = $('#progressBar'), hero = $('#heroMedia'), topBtn = $('#topBtn');
    const chapters = $$('.ch-media');
    let ticking = false;
    function update() {
      ticking = false;
      const y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${H > 0 ? Math.min(1, y / H) : 0})`;
      topBtn.hidden = !(document.body.classList.contains('opened') && y > innerHeight * 1.6);
      if (reduce) return;
      if (y < innerHeight * 1.2) hero.style.setProperty('--py', (y * 0.16).toFixed(1) + 'px');
      for (const m of chapters) {
        const r = m.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) continue;
        const prog = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        m.firstElementChild.style.setProperty('--py', (prog * -22).toFixed(1) + 'px');
      }
    }
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
    update();
  })();

  /* ================= Copy address ================= */
  $('#copyAddr').addEventListener('click', () => {
    const a = 'Sohrab Palamkote Hall, Dadar Parsi Colony, Dadar, Mumbai, Maharashtra 400014';
    const msg = $('#copied');
    try { navigator.clipboard.writeText(a).then(() => { msg.textContent = t('venue.copied'); }, () => { msg.textContent = a; }); }
    catch (e) { msg.textContent = a; }
  });
})();
