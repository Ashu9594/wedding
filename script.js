/* =====================================================================
   Ashutosh & Priyanka — wedding invitation
   Vanilla JS, no dependencies. Sections:
     0. Config            5. Opening curtain       10. Calendar links
     1. Translations      6. Music                 11. Lightbox
     2. Language switch   7. Scroll effects        12. Venue: map + copy
     3. Ornaments         8. Golden betel leaf     13. Akshata, dock
     4. Petal canvas      9. Countdown             
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------- 0. Config ---------------- */
  const CONFIG = {
    muhurat: '2027-01-29T11:13:00+05:30',
    event: {
      title: 'Wedding of Ashutosh & Priyanka',
      startUtc: '20270129T054300Z', endUtc: '20270129T083000Z',
      startIso: '2027-01-29T05:43:00Z', endIso: '2027-01-29T08:30:00Z',
      location: 'Sohrab Palamkote Hall, Dadar Parsi Colony, Dadar, Mumbai, Maharashtra 400014',
      details: 'Shubh muhurat 11:13 AM IST. With love, the Aagawane & Tambe families. Invitation: https://ashu9594.github.io/wedding/'
    },
    address: 'Sohrab Palamkote Hall, Dadar Parsi Colony, Dadar, Mumbai, Maharashtra 400014',
    music: 'assets/audio/lagin-sarai.mp3',
    photos: [ // order used by the lightbox; data-photo="n" on buttons points here
      { src: 'assets/photos/couple-forest-moment.jpg', alt: 'alt.p1' },
      { src: 'assets/photos/couple-together.jpg', alt: 'alt.p2' },
      { src: 'assets/photos/couple-hand-in-hand.jpg', alt: 'alt.p3' },
      { src: 'assets/photos/couple-forehead-closeup.jpg', alt: 'alt.p4' },
      { src: 'assets/photos/couple-beach-run.jpg', alt: 'alt.p5' },
      { src: 'assets/photos/couple-white-hug.jpg', alt: 'alt.p6' },
      { src: 'assets/photos/couple-sunset-embrace.jpg', alt: 'alt.p7' }
    ]
  };

  /* ---------------- 1. Translations (edit any line here) ----------------
     Sacred text (॥ श्री गणेशाय नमः ॥, the Sukhakarta verse, ॥ शुभमंगल सावधान ॥)
     stays in Marathi in both languages and lives directly in index.html. */
  const I18N = {
    en: {
      'alt.ganesh': 'Shri Ganesh seated on a lotus',
      'intro.verseTr': 'Bringer of joy, remover of sorrow — may every obstacle melt away.',
      'intro.families': 'The Aagawane &amp; Tambe families invite you',
      'intro.enter': 'Enter Invitation',
      'music.play': 'Play music', 'music.pause': 'Pause music', 'music.hint': 'Tap for music',

      'hero.eyebrow': 'Together with their families',
      'hero.groom': 'Ashutosh', 'hero.bride': 'Priyanka',
      'hero.sub': 'request the honour of your presence as they begin their forever.',
      'hero.day': 'Friday', 'hero.date': '29 · 01 · 2027', 'hero.city': 'Mumbai',
      'hero.cta1': 'View Invitation', 'hero.cta2': 'Save the Date',
      'hero.scrollAria': 'Scroll to the invitation',
      'alt.hero': 'Ashutosh and Priyanka smiling together among the trees',

      'invite.eyebrow': 'With love',
      'invite.body': 'With the blessings of our elders, we joyfully invite you and your family to grace the wedding ceremony of',
      'invite.groom': 'Ashutosh Aagawane', 'invite.groomParents': 'Son of Mr. Ramesh &amp; Mrs. Maya Aagawane',
      'invite.with': 'with',
      'invite.bride': 'Priyanka Tambe', 'invite.brideParents': 'Daughter of Mr. Rajendra &amp; Mrs. Rajeshri Tambe',
      'invite.when': 'on Friday, 29 January 2027 · Shubh Muhurat 11:13 AM',

      'family.eyebrow': 'Our families', 'family.title': 'Two families, one celebration',
      'family.groomRole': 'The Groom', 'family.groomName': 'Ashutosh Aagawane', 'family.groomOf': 'Son of', 'family.groomParents': 'Mr. Ramesh &amp; Mrs. Maya Aagawane',
      'family.brideRole': 'The Bride', 'family.brideName': 'Priyanka Tambe', 'family.brideOf': 'Daughter of', 'family.brideParents': 'Mr. Rajendra &amp; Mrs. Rajeshri Tambe',
      'family.inviting': 'With warm regards — the Aagawane &amp; Tambe families',

      'reveal.eyebrow': 'A little secret', 'reveal.title': 'Scratch the golden betel leaf',
      'reveal.sub': 'Rub the foil away to reveal our wedding date',
      'reveal.day': '29', 'reveal.month': 'January', 'reveal.year': '2027', 'reveal.week': 'Friday',
      'reveal.aria': 'Golden foil covering the date. Scratch it, or use the Tap to Reveal button.',
      'reveal.btn': 'Tap to Reveal', 'reveal.done': '29 January 2027 ✿',
      'reveal.foil1': 'Scratch', 'reveal.foil2': 'to reveal the date',

      'count.eyebrow': 'Until the shubh muhurat', 'count.title': 'The countdown has begun',
      'count.aria': 'Time left until the muhurat',
      'count.d': 'Days', 'count.h': 'Hours', 'count.m': 'Minutes', 'count.s': 'Seconds',
      'count.note': 'Friday, 29 January 2027 · 11:13 AM IST',
      'count.done': 'Shubh Mangal! Thank you for your blessings.',
      'cal.btn': 'Save the Date', 'cal.google': 'Google Calendar', 'cal.apple': 'Apple Calendar (.ics)', 'cal.outlook': 'Outlook',

      'story.eyebrow': 'Our story', 'story.title': 'A Little Glimpse of Us',
      'story.t1': 'Closer', 'story.c1': 'Some moments become memories forever.',
      'story.t2': 'The journey', 'story.c2': 'Two hearts, one beautiful journey.',
      'story.t3': 'Together', 'story.c3': 'Together, through every little moment.',
      'story.t4': 'Forever', 'story.c4': 'And our forever begins…',

      'moments.eyebrow': 'The album', 'moments.title': 'Our Moments',
      'moments.sub': 'Every picture holds a little piece of our story.',
      'moments.c1': 'Our quiet corner', 'moments.c2': 'Side by side', 'moments.c3': 'Hand in hand',
      'moments.hint': 'Tap a photo to view it full screen · swipe to browse',

      'venue.eyebrow': 'The ceremony', 'venue.title': 'Wedding Ceremony',
      'venue.dateLbl': 'Date', 'venue.date': 'Friday, 29 January 2027',
      'venue.muhuratLbl': 'Shubh Muhurat', 'venue.muhurat': '11:13 AM IST',
      'venue.venueLbl': 'Venue', 'venue.name': 'Sohrab Palamkote Hall',
      'venue.addr': 'Dadar Parsi Colony, Dadar, Mumbai, Maharashtra 400014',
      'venue.badgesAria': 'Nearby landmarks',
      'venue.b1': 'Dadar Parsi Colony', 'venue.b2': 'Near Five Gardens', 'venue.b3': 'Dadar East',
      'venue.directions': 'Get Directions', 'venue.copy': 'Copy Address', 'venue.copied': 'Address copied ✓',


      'close.title': 'Your presence is our blessing',
      'close.body': 'Come, shower the couple with akshata and your love on their most beautiful day.',
      'close.akshata': 'Shower Akshata', 'close.fam1': 'Aagawane family', 'close.fam2': 'Tambe family',
      'close.fine': 'Mumbai · 29 · 01 · 2027',
      'toast.akshata': 'Thank you for your blessings 🙏',

      'dock.aria': 'Sections', 'dock.invite': 'Invite', 'dock.story': 'Story', 'dock.photos': 'Photos', 'dock.venue': 'Venue', 'dock.calendar': 'Calendar',
      'lb.dialog': 'Photo viewer', 'lb.close': 'Close', 'lb.prev': 'Previous photo', 'lb.next': 'Next photo', 'lb.open': 'Open photo full screen',

      'alt.p1': 'Ashutosh and Priyanka sitting close on a fallen tree in the forest',
      'alt.p2': 'Ashutosh and Priyanka standing together, smiling at the camera',
      'alt.p3': 'Ashutosh and Priyanka back to back, holding hands on a forest path',
      'alt.p4': 'Ashutosh and Priyanka forehead to forehead, eyes closed',
      'alt.p5': 'Ashutosh and Priyanka running hand in hand through the waves',
      'alt.p6': 'Priyanka hugging Ashutosh, both smiling in white',
      'alt.p7': 'Ashutosh and Priyanka forehead to forehead at sunset'
    },
    mr: {
      'alt.ganesh': 'कमळावर विराजमान श्री गणेश',
      'intro.verseTr': 'सुख देणारा, दुःख हरणारा — सर्व विघ्ने दूर होवोत.',
      'intro.families': 'आगवणे व तांबे परिवार आपणास सस्नेह निमंत्रण देत आहेत',
      'intro.enter': 'निमंत्रण उघडा',
      'music.play': 'संगीत सुरू करा', 'music.pause': 'संगीत थांबवा', 'music.hint': 'संगीतासाठी टॅप करा',

      'hero.eyebrow': 'शुभविवाह',
      'hero.groom': 'आशुतोष', 'hero.bride': 'प्रियांका',
      'hero.sub': 'आपल्या आशीर्वादाने नव्या आयुष्याची सुरुवात करत आहेत.',
      'hero.day': 'शुक्रवार', 'hero.date': '२९ · ०१ · २०२७', 'hero.city': 'मुंबई',
      'hero.cta1': 'निमंत्रण पाहा', 'hero.cta2': 'तारीख जतन करा',
      'hero.scrollAria': 'निमंत्रणाकडे जा',
      'alt.hero': 'झाडांमध्ये एकत्र हसताना आशुतोष आणि प्रियांका',

      'invite.eyebrow': 'सस्नेह निमंत्रण',
      'invite.body': 'वडीलधाऱ्यांच्या आशीर्वादाने आमच्या घरी शुभविवाह योजिला आहे. या मंगलप्रसंगी आपण सहकुटुंब सहपरिवार उपस्थित राहून वधूवरांस शुभाशीर्वाद द्यावेत, ही नम्र विनंती.',
      'invite.groom': 'चि. आशुतोष', 'invite.groomParents': 'श्री. रमेश व सौ. माया आगवणे यांचे चिरंजीव',
      'invite.with': 'संगे',
      'invite.bride': 'चि. सौ. कां. प्रियांका', 'invite.brideParents': 'श्री. राजेंद्र व सौ. राजश्री तांबे यांची कन्या',
      'invite.when': 'शुक्रवार, दि. २९ जानेवारी २०२७ · शुभ मुहूर्त सकाळी ११ वा. १३ मि.',

      'family.eyebrow': 'आमचे परिवार', 'family.title': 'दोन परिवार, एक आनंदोत्सव',
      'family.groomRole': 'वर', 'family.groomName': 'चि. आशुतोष आगवणे', 'family.groomOf': '', 'family.groomParents': 'श्री. रमेश व सौ. माया आगवणे यांचे चिरंजीव',
      'family.brideRole': 'वधू', 'family.brideName': 'चि. सौ. कां. प्रियांका तांबे', 'family.brideOf': '', 'family.brideParents': 'श्री. राजेंद्र व सौ. राजश्री तांबे यांची कन्या',
      'family.inviting': 'आपले नम्र — आगवणे व तांबे परिवार',

      'reveal.eyebrow': 'एक छोटंसं गुपित', 'reveal.title': 'सोनेरी विड्याचं पान घासा',
      'reveal.sub': 'सोनेरी वर्ख घासा आणि आमच्या लग्नाची तारीख पाहा',
      'reveal.day': '२९', 'reveal.month': 'जानेवारी', 'reveal.year': '२०२७', 'reveal.week': 'शुक्रवार',
      'reveal.aria': 'तारीख झाकणारा सोनेरी वर्ख. तो घासा किंवा "तारीख दाखवा" बटण वापरा.',
      'reveal.btn': 'तारीख दाखवा', 'reveal.done': '२९ जानेवारी २०२७ ✿',
      'reveal.foil1': 'घासा', 'reveal.foil2': 'आणि तारीख पाहा',

      'count.eyebrow': 'शुभ मुहूर्ताला उरले', 'count.title': 'उलटी गणती सुरू झाली',
      'count.aria': 'मुहूर्ताला उरलेला वेळ',
      'count.d': 'दिवस', 'count.h': 'तास', 'count.m': 'मिनिटे', 'count.s': 'सेकंद',
      'count.note': 'शुक्रवार, २९ जानेवारी २०२७ · सकाळी ११ वा. १३ मि.',
      'count.done': 'शुभमंगल संपन्न! आपल्या आशीर्वादाबद्दल धन्यवाद.',
      'cal.btn': 'तारीख जतन करा', 'cal.google': 'Google कॅलेंडर', 'cal.apple': 'Apple कॅलेंडर (.ics)', 'cal.outlook': 'Outlook',

      'story.eyebrow': 'आमची गोष्ट', 'story.title': 'आमची एक छोटीशी झलक',
      'story.t1': 'जवळीक', 'story.c1': 'काही क्षण कायमचे आठवणी बनतात.',
      'story.t2': 'प्रवास', 'story.c2': 'दोन मनं, एक सुंदर प्रवास.',
      'story.t3': 'सोबत', 'story.c3': 'प्रत्येक क्षण एकत्र.',
      'story.t4': 'कायमचे', 'story.c4': 'आणि आता सुरू होत आहे आपला सुंदर प्रवास…',

      'moments.eyebrow': 'आमचा अल्बम', 'moments.title': 'आमचे क्षण',
      'moments.sub': 'आमच्या सुंदर आठवणींचे काही खास क्षण',
      'moments.c1': 'आमचा शांत कोपरा', 'moments.c2': 'एकमेकांसोबत', 'moments.c3': 'हातात हात',
      'moments.hint': 'फोटो पूर्ण स्क्रीनवर पाहण्यासाठी टॅप करा · पुढे पाहण्यासाठी स्वाइप करा',

      'venue.eyebrow': 'कार्यक्रम', 'venue.title': 'विवाह सोहळा',
      'venue.dateLbl': 'दिनांक', 'venue.date': 'शुक्रवार, २९ जानेवारी २०२७',
      'venue.muhuratLbl': 'शुभ मुहूर्त', 'venue.muhurat': 'सकाळी ११ वाजून १३ मिनिटे',
      'venue.venueLbl': 'स्थळ', 'venue.name': 'सोहराब पालमकोटे हॉल',
      'venue.addr': 'दादर पारसी कॉलनी, दादर, मुंबई, महाराष्ट्र ४०००१४',
      'venue.badgesAria': 'जवळच्या खुणा',
      'venue.b1': 'दादर पारसी कॉलनी', 'venue.b2': 'फाइव्ह गार्डन्सजवळ', 'venue.b3': 'दादर पूर्व',
      'venue.directions': 'नकाशा पाहा', 'venue.copy': 'पत्ता कॉपी करा', 'venue.copied': 'पत्ता कॉपी झाला ✓',


      'close.title': 'आपली उपस्थिती प्रार्थनीय',
      'close.body': 'या, वधूवरांवर अक्षतांचा वर्षाव करा आणि त्यांच्या आयुष्यातील सर्वात सुंदर दिवशी आपले प्रेम द्या.',
      'close.akshata': 'अक्षता वाहा', 'close.fam1': 'आगवणे परिवार', 'close.fam2': 'तांबे परिवार',
      'close.fine': 'मुंबई · २९ · ०१ · २०२७',
      'toast.akshata': 'आपल्या आशीर्वादाबद्दल मनःपूर्वक धन्यवाद 🙏',

      'dock.aria': 'विभाग', 'dock.invite': 'निमंत्रण', 'dock.story': 'गोष्ट', 'dock.photos': 'फोटो', 'dock.venue': 'स्थळ', 'dock.calendar': 'कॅलेंडर',
      'lb.dialog': 'फोटो दर्शक', 'lb.close': 'बंद करा', 'lb.prev': 'मागील फोटो', 'lb.next': 'पुढील फोटो', 'lb.open': 'फोटो पूर्ण स्क्रीनवर उघडा',

      'alt.p1': 'जंगलात पडलेल्या झाडावर जवळ बसलेले आशुतोष आणि प्रियांका',
      'alt.p2': 'कॅमेऱ्याकडे पाहून हसणारे आशुतोष आणि प्रियांका',
      'alt.p3': 'पाठीला पाठ लावून हात धरलेले आशुतोष आणि प्रियांका',
      'alt.p4': 'डोळे मिटून कपाळाला कपाळ लावलेले आशुतोष आणि प्रियांका',
      'alt.p5': 'हातात हात घालून लाटांमधून धावणारे आशुतोष आणि प्रियांका',
      'alt.p6': 'पांढऱ्या पोशाखात हसत मिठी मारलेले आशुतोष आणि प्रियांका',
      'alt.p7': 'सूर्यास्ताच्या प्रकाशात कपाळाला कपाळ लावलेले आशुतोष आणि प्रियांका'
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  /* ---------------- 2. Language switch ---------------- */
  let lang = store.get('wedding-lang');
  if (!I18N[lang]) lang = (navigator.language || '').toLowerCase().startsWith('mr') ? 'mr' : 'en';
  const t = (k) => { const v = I18N[lang][k]; return v != null ? v : (I18N.en[k] || ''); };
  const DEV = '०१२३४५६७८९';
  const num = (n) => (lang === 'mr' ? String(n).replace(/\d/g, (d) => DEV[d]) : String(n));
  const onLang = [];

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    onLang.forEach((fn) => fn());
  }
  function setLang(next) {
    if (next === lang || !I18N[next]) return;
    lang = next; store.set('wedding-lang', lang);
    if (reduce) return applyLang();
    document.body.classList.add('lang-fade');
    setTimeout(() => { applyLang(); requestAnimationFrame(() => document.body.classList.remove('lang-fade')); }, 230);
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  applyLang();

  /* ---------------- toast ---------------- */
  const toastEl = $('#toast'); let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  /* ---------------- 3. Ornaments ---------------- */
  const LOTUS = '<svg viewBox="0 0 240 24"><path d="M0 12H90M150 12H240" stroke="currentColor" stroke-width="1"/>' +
    '<circle cx="95" cy="12" r="1.8" fill="currentColor"/><circle cx="145" cy="12" r="1.8" fill="currentColor"/>' +
    '<path d="M120 1C126 7 126 16 120 23C114 16 114 7 120 1Z" fill="currentColor"/>' +
    '<path d="M120 23C110 22 103 15 101 7C110 8 117 15 120 23ZM120 23C130 22 137 15 139 7C130 8 123 15 120 23Z" fill="none" stroke="currentColor" stroke-width="1"/>' +
    '<path d="M120 23C113 23 106 20 102 16M120 23C127 23 134 20 138 16" fill="none" stroke="currentColor" stroke-width=".8"/></svg>';
  $$('.divider').forEach((d) => { d.innerHTML = LOTUS; });

  // Toran of mango leaves and marigold strings across the top of the hero
  (function toran() {
    const svg = $('.toran'); if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };
    svg.appendChild(mk('path', { d: 'M0 12 Q300 30 600 12', stroke: '#C59B27', 'stroke-width': 2, fill: 'none' }));
    const n = 17;
    for (let i = 0; i <= n; i++) {
      const x = i * 600 / n, y = 12 + 18 * (1 - Math.pow((x - 300) / 300, 2));
      if (i % 2 === 0) {
        const g = mk('g', { transform: `translate(${x} ${y})` });
        [0, 13, 26].forEach((dy, j) => g.appendChild(mk('circle', { cx: 0, cy: dy + 7, r: 7 - j * .8, fill: j === 1 ? '#F2B705' : '#E8821C', stroke: '#B85A0C', 'stroke-width': .8 })));
        svg.appendChild(g);
      } else {
        const g = mk('g', { transform: `translate(${x} ${y}) rotate(${i % 4 === 1 ? -5 : 5})` });
        g.appendChild(mk('path', { d: 'M0 0 C13 16 12 48 0 66 C-12 48 -13 16 0 0Z', fill: '#2E4A36' }));
        g.appendChild(mk('path', { d: 'M0 4 V62', stroke: '#8DBF98', 'stroke-width': 1, 'stroke-opacity': .55 }));
        svg.appendChild(g);
      }
    }
  })();

  // Slow CSS petals in the hero and closing
  $$('.petals').forEach((box) => {
    const colors = ['#E8821C', '#F2B705', '#C9184A', '#F7C548', '#E05780'];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('span');
      s.style.cssText = `--x:${Math.random() * 100}%;--w:${8 + Math.random() * 8}px;--c:${colors[i % colors.length]};` +
        `--dur:${10 + Math.random() * 9}s;--delay:${-Math.random() * 16}s;--drift:${(Math.random() - .5) * 140}px`;
      box.appendChild(s);
    }
  });

  /* ---------------- 4. Petal / akshata / sparkle canvas ---------------- */
  const fx = (() => {
    const c = $('#fx'), x = c.getContext('2d'); let parts = [], raf = null, W = 0, H = 0;
    const PAL = {
      marigold: ['#F29F05', '#F2B705', '#E8821C', '#F7C548'],
      rose: ['#C9184A', '#E05780', '#B5172F', '#F08CA0'],
      rice: ['#F3E5AB', '#EADBA3', '#FFF6D8', '#D4AF37'],
      spark: ['#F3E5AB', '#D4AF37', '#FFFFFF']
    };
    function size() { const d = Math.min(devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0); }
    addEventListener('resize', size); size();
    const pick = (a) => a[(Math.random() * a.length) | 0];
    function petalPath(s) { x.beginPath(); x.moveTo(0, -s); x.bezierCurveTo(s * .9, -s * .6, s * .7, s * .7, 0, s); x.bezierCurveTo(-s * .7, s * .7, -s * .9, -s * .6, 0, -s); }
    function tick() {
      x.clearRect(0, 0, W, H);
      parts = parts.filter((p) => p.y < H + 30 && p.life > 0);
      for (const p of parts) {
        if (p.kind === 'spark') { p.vx *= .96; p.vy = p.vy * .96 + .05; p.life -= .018; }
        else { p.vy = Math.min(p.vy + .03, p.max); p.vx += Math.sin((p.y + p.ph) / 50) * .03; }
        p.x += p.vx; p.y += p.vy; p.r += p.vr; p.flip += .05;
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.globalAlpha = Math.max(0, Math.min(1, p.life));
        x.fillStyle = p.c;
        if (p.kind === 'rice') { x.beginPath(); x.ellipse(0, 0, 3.4, 1.4, 0, 0, 7); x.fill(); }
        else if (p.kind === 'spark') {
          const s = p.s; x.beginPath();
          for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, rr = k % 2 ? s * .35 : s; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
          x.closePath(); x.fill();
        } else { x.scale(1, Math.abs(Math.cos(p.flip)) * .7 + .3); petalPath(p.s); x.fill(); }
        x.restore();
      }
      raf = parts.length ? requestAnimationFrame(tick) : null;
    }
    const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
    return {
      rain(n = 140, kinds = ['marigold', 'rose']) {
        if (reduce) return;
        for (let i = 0; i < n; i++) {
          const kind = kinds[i % kinds.length];
          parts.push({ kind, c: pick(PAL[kind]), x: Math.random() * W, y: -20 - Math.random() * H * .8, vx: (Math.random() - .5) * .8, vy: 1 + Math.random() * 1.6,
            max: kind === 'rice' ? 4.5 : 2.6, r: Math.random() * 6, vr: (Math.random() - .5) * .08, ph: Math.random() * 100, flip: Math.random() * 6, s: 5 + Math.random() * 5, life: 1 });
        }
        run();
      },
      burst(cx, cy, n = 70) {
        if (reduce) return;
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 5;
          parts.push({ kind: 'spark', c: pick(PAL.spark), x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: Math.random() * 3, vr: .1, flip: 0, s: 3 + Math.random() * 4, life: 1, max: 9 });
        }
        run();
      }
    };
  })();

  /* ---------------- 6. Music (muted until the guest taps it) ---------------- */
  const music = (() => {
    const btn = $('#musicBtn'), hint = $('#musicHint');
    let audio = null, on = false, fade = null;
    function ramp(to, ms, done) {
      clearInterval(fade); const from = audio.volume, t0 = performance.now();
      fade = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / ms); audio.volume = from + (to - from) * k; if (k >= 1) { clearInterval(fade); done && done(); } }, 40);
    }
    function label() { btn.setAttribute('aria-label', t(on ? 'music.pause' : 'music.play')); btn.setAttribute('aria-pressed', String(on)); }
    function set(v) {
      if (!audio) { audio = new Audio(CONFIG.music); audio.loop = true; audio.volume = 0; }
      on = v; btn.classList.toggle('on', on); btn.classList.remove('invite'); hint.hidden = true; label();
      if (on) { const p = audio.play(); if (p && p.catch) p.catch(() => { on = false; btn.classList.remove('on'); label(); }); ramp(.8, 1400); }
      else ramp(0, 500, () => { if (!on) audio.pause(); });
    }
    btn.addEventListener('click', () => set(!on));
    document.addEventListener('visibilitychange', () => { if (!audio) return; if (document.hidden) audio.pause(); else if (on) audio.play().catch(() => {}); });
    onLang.push(label);
    return {
      reveal() {
        btn.hidden = false; btn.classList.add('invite');
        hint.hidden = false; setTimeout(() => { hint.hidden = true; }, 6000);
      }
    };
  })();

  /* ---------------- 5. Opening curtain ---------------- */
  const intro = $('#intro'), dock = $('#dock');
  $$('.hero [data-stagger]').forEach((el, i) => { el.style.transitionDelay = (el.classList.contains('hero-arch') ? 0.05 : 0.3 + i * 0.12) + 's'; });
  document.body.classList.add('locked', 'on-dark');
  $('#enterBtn').addEventListener('click', () => {
    // Order matters for smoothness: curtains move first, petals and the hero follow once the panels are under way.
    intro.classList.add('open');
    const small = innerWidth < 768;
    setTimeout(() => fx.rain(small ? 70 : 110, ['marigold', 'rose', 'marigold']), reduce ? 0 : 320);
    setTimeout(() => document.body.classList.add('opened'), reduce ? 0 : 650);
    setTimeout(() => {
      intro.classList.add('done'); intro.hidden = true;
      document.body.classList.remove('locked');
      music.reveal(); dock.hidden = false; updateDockPad(); onScroll();
    }, reduce ? 0 : 1350);
  }, { once: true });
  function updateDockPad() { document.documentElement.style.setProperty('--dock-h', dock.hidden || innerWidth >= 768 ? '0px' : (dock.offsetHeight + 16) + 'px'); }
  addEventListener('resize', updateDockPad);

  /* ---------------- 7. Scroll effects ---------------- */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach((el) => { if (el.getBoundingClientRect().top > innerHeight * .92) { el.classList.add('pre'); io.observe(el); } });
  }
  const bar = $('#progressBar'), heroImg = $('#heroImg'), tlImgs = $$('.tl-photo img'), darkSecs = $$('.maroon, .paithani');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    if (intro.hidden) {
      const probe = 40; // language pill sits ~40px from the top: switch its style over dark bands
      document.body.classList.toggle('on-dark', darkSecs.some((s) => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom >= probe; }));
    }
    if (reduce) return;
    if (y < innerHeight * 1.3) heroImg.style.setProperty('--py', (y * 0.06).toFixed(1) + 'px');
    for (const img of tlImgs) {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < -80 || r.top > innerHeight + 80) continue;
      img.style.setProperty('--py', (((r.top + r.height / 2) - innerHeight / 2) / innerHeight * -20).toFixed(1) + 'px');
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);

  // Dock: highlight the section in view
  if ('IntersectionObserver' in window) {
    const links = $$('.dock a');
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.dataset.sec === e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['invite', 'story', 'moments', 'venue', 'countdown'].forEach((id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------------- 8. Golden betel leaf (scratch to reveal) ---------------- */
  (function leafScratch() {
    const box = $('#leaf'), c = $('#foil'), x = c.getContext('2d');
    const leaf = new Path2D('M150 44 C110 -2 8 14 12 108 C16 196 96 262 150 334 C204 262 284 196 288 108 C292 14 190 -2 150 44 Z');
    let done = false, drawing = false, last = null, touched = false, scale = 1, lastBuzz = 0;
    function paint() {
      const r = box.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      if (!r.width) return;
      c.width = r.width * d; c.height = r.height * d; scale = r.width / 300;
      x.setTransform(d * scale, 0, 0, d * scale, 0, 0);
      x.globalCompositeOperation = 'source-over';
      const g = x.createLinearGradient(0, 0, 300, 340);
      g.addColorStop(0, '#D4AF37'); g.addColorStop(.3, '#F3E5AB'); g.addColorStop(.55, '#C59B27'); g.addColorStop(.8, '#F0DC9A'); g.addColorStop(1, '#AA7C11');
      x.fillStyle = g; x.fill(leaf);
      x.save(); x.clip(leaf);
      x.strokeStyle = 'rgba(120,80,10,.16)'; x.lineWidth = .8;                                   // brushed foil
      for (let i = -340; i < 340; i += 6) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 340, 340); x.stroke(); }
      x.strokeStyle = 'rgba(255,250,230,.55)'; x.lineWidth = 2;                                   // embossed veins
      x.beginPath(); x.moveTo(150, 46); x.lineTo(150, 318);
      [[110, 64, 120], [176, 84, 192]].forEach(([yy, lx, ly]) => { x.moveTo(150, yy); x.quadraticCurveTo(lx + 44, yy + 16, lx, ly); x.moveTo(150, yy); x.quadraticCurveTo(300 - lx - 44, yy + 16, 300 - lx, ly); });
      x.stroke(); x.restore();
      x.fillStyle = '#5B1218'; x.textAlign = 'center';
      x.font = lang === 'mr' ? '32px "Tiro Devanagari Marathi", serif' : 'italic 500 34px "Cormorant Garamond", serif';
      x.fillText(t('reveal.foil1'), 150, 176);
      x.font = lang === 'mr' ? '17px "Noto Serif Devanagari", serif' : '600 11px "Plus Jakarta Sans", sans-serif';
      x.fillText(lang === 'mr' ? t('reveal.foil2') : t('reveal.foil2').toUpperCase(), 150, 202);
    }
    const pos = (e) => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale }; };
    function scratch(p) {
      touched = true; box.classList.add('scratching');
      x.globalCompositeOperation = 'destination-out'; x.lineCap = 'round'; x.lineWidth = 40;
      x.beginPath(); x.moveTo((last || p).x, (last || p).y); x.lineTo(p.x, p.y); x.stroke();
      x.beginPath(); x.arc(p.x, p.y, 20, 0, 7); x.fill(); last = p;
      const now = performance.now();
      if (navigator.vibrate && now - lastBuzz > 90) { navigator.vibrate(6); lastBuzz = now; } // light haptic tick on Android
    }
    function cleared() {
      const d = x.getImageData(0, 0, c.width, c.height).data; let tot = 0, clr = 0;
      for (let i = 3; i < d.length; i += 64) {
        const px = ((i - 3) / 4) % c.width, py = Math.floor((i - 3) / 4 / c.width);
        if (x.isPointInPath(leaf, px, py)) { tot++; if (d[i] < 40) clr++; }
      }
      return tot ? clr / tot : 0;
    }
    function label() { if (done) $('#revealBtn').textContent = t('reveal.done'); }
    function reveal() {
      if (done) return; done = true;
      box.classList.add('revealed'); c.style.transition = 'opacity .8s'; c.style.opacity = 0; c.style.pointerEvents = 'none'; label();
      const r = box.getBoundingClientRect();
      fx.burst(r.left + r.width / 2, r.top + r.height * .45, 80);
    }
    c.addEventListener('pointerdown', (e) => { drawing = true; last = null; c.setPointerCapture(e.pointerId); scratch(pos(e)); });
    c.addEventListener('pointermove', (e) => { if (drawing) scratch(pos(e)); });
    const end = () => { if (!drawing) return; drawing = false; last = null; if (cleared() >= .5) reveal(); };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
    $('#revealBtn').addEventListener('click', reveal);
    let w = box.clientWidth;
    addEventListener('resize', () => { if (box.clientWidth !== w && !done) { w = box.clientWidth; touched = false; box.classList.remove('scratching'); paint(); } });
    onLang.push(() => { if (!done && !touched) paint(); label(); });
    paint();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!done && !touched) paint(); });
  })();

  /* ---------------- 9. Countdown ---------------- */
  (function countdown() {
    const target = new Date(CONFIG.muhurat).getTime();
    const els = { d: $('#cd-d'), h: $('#cd-h'), m: $('#cd-m'), s: $('#cd-s') };
    const pad = (n) => String(n).padStart(2, '0');
    function put(k, v) {
      const el = els[k], txt = num(v);
      if (el.textContent === txt) return;
      el.textContent = txt;
      if (!reduce) { el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip'); }
    }
    function tick() {
      let s = Math.floor((target - Date.now()) / 1000);
      if (s <= 0) { ['d', 'h', 'm', 's'].forEach((k) => put(k, '00')); $('#cdNote').textContent = t('count.done'); return false; }
      put('d', Math.floor(s / 86400)); s %= 86400;
      put('h', pad(Math.floor(s / 3600))); s %= 3600;
      put('m', pad(Math.floor(s / 60))); put('s', pad(s % 60));
      return true;
    }
    onLang.push(tick);
    if (tick()) { const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000); }
  })();

  /* ---------------- 10. Save the Date ---------------- */
  (function calendar() {
    const E = CONFIG.event, enc = encodeURIComponent;
    $('#calGoogle').href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(E.title)}&dates=${E.startUtc}/${E.endUtc}&details=${enc(E.details)}&location=${enc(E.location)}`;
    $('#calOutlook').href = `https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=${enc(E.title)}&startdt=${enc(E.startIso)}&enddt=${enc(E.endIso)}&location=${enc(E.location)}&body=${enc(E.details)}`;
    const btn = $('#calBtn'), menu = $('#calMenu');
    const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); const open = menu.hidden; menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); if (open) menu.querySelector('a').focus(); });
    document.addEventListener('click', (e) => { if (!menu.hidden && !$('#cal').contains(e.target)) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { close(); btn.focus(); } });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setTimeout(close, 150)));
  })();

  /* ---------------- 11. Lightbox ---------------- */
  (function lightbox() {
    const lb = $('#lightbox'), img = $('#lbImg'), count = $('#lbCount'), P = CONFIG.photos;
    let i = 0, lastFocus = null, x0 = null, y0 = null;
    function render() { img.src = P[i].src; img.alt = t(P[i].alt); count.textContent = num(i + 1) + ' / ' + num(P.length); }
    function show(n, instant) {
      i = (n + P.length) % P.length;
      if (instant || reduce) return render();
      img.classList.add('swap');
      setTimeout(() => { render(); const fin = () => img.classList.remove('swap'); if (img.complete) requestAnimationFrame(fin); else img.onload = fin; }, 200);
    }
    function open(n) {
      lastFocus = document.activeElement; show(n, true);
      lb.hidden = false; document.body.classList.add('locked'); requestAnimationFrame(() => lb.classList.add('show'));
      $('.lb-close', lb).focus();
      P.forEach((p) => { const im = new Image(); im.src = p.src; });
    }
    function close() {
      lb.classList.remove('show'); setTimeout(() => { lb.hidden = true; }, reduce ? 0 : 300);
      document.body.classList.remove('locked'); if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    $$('[data-photo]').forEach((b) => b.addEventListener('click', () => open(+b.dataset.photo)));
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(i - 1));
    $('.lb-next', lb).addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(i - 1);
      else if (e.key === 'ArrowRight') show(i + 1);
      else if (e.key === 'Tab') { const f = $$('.lb-btn', lb), k = f.indexOf(document.activeElement); e.preventDefault(); f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
    });
    const stage = $('.lb-stage', lb);
    stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; y0 = e.clientY; });
    stage.addEventListener('pointerup', (e) => {
      if (x0 == null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(i + (dx < 0 ? 1 : -1));
    });
    onLang.push(() => { if (!lb.hidden) render(); });

    // gentle 3D tilt on polaroids (pointer devices only)
    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
      $$('.pol').forEach((p) => {
        p.addEventListener('pointermove', (e) => {
          const r = p.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
          p.style.transform = `rotate(var(--r)) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
        });
        p.addEventListener('pointerleave', () => { p.style.transform = ''; });
      });
    }
  })();

  /* ---------------- 12. Venue: lazy map + copy address ---------------- */
  (function venue() {
    const frame = $('.venue-map iframe');
    const load = () => { if (!frame.src) frame.src = frame.dataset.src; };
    if ('IntersectionObserver' in window) {
      const mo = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { load(); mo.disconnect(); } }, { rootMargin: '400px 0px' });
      mo.observe(frame);
    } else load();
    $('#copyAddr').addEventListener('click', () => {
      const done = () => toast(t('venue.copied'));
      const fallback = () => {
        const ta = document.createElement('textarea'); ta.value = CONFIG.address; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { toast(CONFIG.address); }
        ta.remove();
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(CONFIG.address).then(done, fallback); else fallback();
    });
  })();

  /* ---------------- 13. Akshata ---------------- */
  $('#akshataBtn').addEventListener('click', () => {
    fx.rain(180, ['rice', 'rice', 'marigold', 'rose']);
    toast(t('toast.akshata'));
  });

  onScroll();
})();
