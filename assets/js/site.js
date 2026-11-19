/* Heath Electric — site script
 *
 * FACTS (fill these in when the owner sends them; every "awaiting" spot on the page updates itself)
 */
const CONFIG = {
  PHONE: '(647) 895-5693',
  EMAIL: '',          // quote requests are emailed here (mailto) unless FORM_ENDPOINT is set
  HOURS: '',          // e.g. 'Mon–Fri 7 am–6 pm, emergencies by phone'
  AREA: 'Toronto & GTA',
  LICENCE: 'ECRA/ESA Licence #7018901 · Master Electrician',
  INSURANCE: 'Insured',
  FORM_ENDPOINT: ''   // optional: Formspree/Basin URL; leave blank to use mailto
};

const IMG = (id, w = 1100) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

const SERVICES = [
  { id: 'trouble', label: 'Troubleshooting & repairs', title: 'Troubleshooting & repairs',
    text: 'Breakers that keep tripping, outlets that died, lights that flicker, switches that buzz or feel warm. Found, explained and fixed.',
    list: ['Fault traced with proper testing, not guesswork', 'A plain explanation of what failed and why', 'A fix price before the repair starts'],
    note: 'if something smells hot or you see scorch marks, switch off that breaker and don’t reset it until it’s been checked.',
    img: IMG('1758101755915-462eddc23f57'), alt: 'An electrician testing a breaker panel with a multimeter' },
  { id: 'residential', label: 'Residential electrical', title: 'Residential electrical',
    text: 'Electrical work for houses, townhomes and condos: new circuits, upgrades, repairs and safety checks, done neatly and to code.',
    list: ['Fuse box, knob-and-tube and aluminum wiring assessments', 'Upgrades and repairs with as little wall damage as possible', 'ESA permits filed where the job needs one'],
    note: 'many insurers ask about older wiring when you buy or renew a policy. An assessment gives you a clear answer.',
    img: IMG('1587534012737-1fd8a84b519e'), alt: 'A white duplex wall outlet on a teal painted wall' },
  { id: 'lighting', label: 'Lighting & pot lights', title: 'Lighting, pot lights & dimmers',
    text: 'Slim LED pot lights, pendants over the island, under-cabinet strips, mood lighting, dimmers that don’t buzz, and exterior lights on timers or sensors.',
    list: ['Layout planned for even light, not a grid of random holes', 'Minimal drywall patching through existing ceilings', 'Dimmers matched to the fixtures so nothing flickers'],
    note: 'warm white (2700–3000 K) suits most living spaces; cooler light suits garages and workshops.',
    img: IMG('1730991568658-ad8638395a9e'), alt: 'A bright kitchen with a white island and glass pendant lights' },
  { id: 'commercial', label: 'Commercial electrical', title: 'Commercial electrical',
    text: 'Offices, retail units, restaurants and light industrial spaces: fit-outs, lighting upgrades, equipment circuits and repairs, planned around your business hours.',
    list: ['Tenant fit-outs and renovations', 'LED lighting retrofits and emergency lighting', 'Work scheduled to keep downtime low'],
    note: 'commercial work is filed with the ESA and inspected too. Tell us your opening hours and the work is planned around them.',
    img: IMG('1652715564391-38cc4475b7f5'), alt: 'Wiring and breakers inside an electrical panel' },
  { id: 'panel', label: 'Panel & service upgrades', title: 'Panel & service upgrades',
    text: 'Moving from 100 A to 200 A, replacing an old fuse box or a panel your insurer has flagged, or adding a sub-panel for a basement, garage or addition.',
    list: ['Load check on what your home draws today and what you plan to add', 'Coordination with your utility for the disconnect and reconnect', 'New breakers and a clean, organized panel'],
    note: 'panel replacements always need an ESA permit and inspection. You’ll know what your job needs before you agree to anything.',
    img: IMG('1660330589693-99889d60181e'), alt: 'An electrician working inside an open residential breaker panel' },
  { id: 'reno', label: 'Renovations & additions', title: 'Renovations & additions',
    text: 'Kitchen and bath renovations, basement finishes and additions: moved walls, moved outlets and new circuits, done on your contractor’s schedule.',
    list: ['Circuit plan before the drywall goes up', 'Rough-in ready for inspection on time', 'Final connections, devices and testing'],
    note: 'basement and kitchen renos usually need new dedicated circuits. Planning them early is cheaper than opening walls later.',
    img: IMG('1621905251189-08b45d6a269e'), alt: 'An electrician in a hard hat installing wiring at a wall box' },
  { id: 'ev', label: 'EV charger installation', title: 'EV charger installation',
    text: 'A Level 2 charger in the garage or driveway on its own dedicated circuit, placed where the cable actually reaches the car.',
    list: ['Check of your panel’s spare capacity before anything is bought', 'Dedicated circuit and a weather-rated install outside', 'Help choosing a hardwired or plug-in charger'],
    note: 'many homes can add a charger without a panel upgrade. A load calculation tells you for sure.',
    img: IMG('1766507680004-1c71007aefe5'), alt: 'A wall-mounted electric car charger on a wooden fence' },
  { id: 'newbuild', label: 'Custom homes & new builds', title: 'Custom homes & new builds',
    text: 'Complete electrical for new homes, from the service and panel through rough-in, fixtures and final inspection, coordinated with your builder.',
    list: ['Electrical layout reviewed with you and your builder', 'Rough-in and final inspections booked on schedule', 'Lighting, data and EV-ready circuits planned from day one'],
    note: 'extra circuits, data runs and EV wiring cost far less while the walls are still open.',
    img: IMG('1621905251189-08b45d6a269e'), alt: 'An electrician in a hard hat installing wiring at a wall box' },
  { id: 'dedicated', label: 'Dedicated circuits', title: 'Dedicated circuits',
    text: 'A circuit of its own for the things that need one: kitchen appliances, freezers, sump pumps, workshops, home gyms and heat pumps.',
    list: ['Load check before anything is added', 'Correct wire size and breaker for the equipment', 'GFCI or AFCI protection where the code calls for it'],
    note: 'if a breaker trips whenever two appliances run together, a dedicated circuit is usually the fix.',
    img: IMG('1576446470246-499c738d1c8e'), alt: 'A neat row of new white breakers with wiring dressed along the rails' },
  { id: 'outdoor', label: 'Hot tubs & outdoor power', title: 'Hot tubs, outdoor & garage power',
    text: 'Hot tub and pool equipment hookups with the disconnect in the right place, weatherproof outlets, landscape and security lighting, and power to the garage or shed.',
    list: ['Hot tub disconnects placed where the code requires', 'Buried or surface runs done to the right depth and rating', 'Outdoor GFCI protection throughout'],
    note: 'a hot tub needs its own GFCI-protected circuit and a disconnect within sight of the tub, kept at least 1.5 m from the water. Plan the spot before the tub arrives.',
    img: IMG('1772040942277-b194d9d0b648'), alt: 'A hot tub on a wooden deck surrounded by a lush garden' },
  { id: 'outlets', label: 'Outlets, switches & GFCIs', title: 'Outlets, switches & GFCIs',
    text: 'New outlets where you actually need them, USB-C and smart switches, GFCI protection in kitchens, baths and outdoors, and two-prong outlets brought up to date.',
    list: ['Added circuits where one is doing too much', 'GFCI and AFCI protection where the code calls for it', 'Cover plates straight, flush and level'],
    note: 'swapping a two-prong outlet for a three-prong one without a ground isn’t safe on its own. There are proper ways to fix it.',
    img: IMG('1587534012737-1fd8a84b519e'), alt: 'A white duplex wall outlet on a teal painted wall' },
  { id: 'data', label: 'Data & network cabling', title: 'Data & network cabling',
    text: 'Wired internet to offices, TVs and access points, a tidy network panel, and cabling for cameras and doorbells, so Wi-Fi isn’t doing all the work.',
    list: ['Cat6 runs to the rooms that need them', 'A structured network panel to keep it organized', 'Wiring for cameras, doorbells and access points'],
    note: 'during a renovation or new build, data runs cost a fraction of what they do once the walls are closed.',
    img: IMG('1652715564391-38cc4475b7f5'), alt: 'Wiring and breakers inside an electrical panel' }
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const narrow = () => matchMedia('(max-width:1080px)').matches;
const telHref = n => 'tel:' + n.replace(/[^\d+]/g, '');

/* ---------- owner facts ---------- */
function fillFacts() {
  const map = { phone: CONFIG.PHONE, email: CONFIG.EMAIL, hours: CONFIG.HOURS, area: CONFIG.AREA, licence: CONFIG.LICENCE, insurance: CONFIG.INSURANCE };
  $$('[data-fill]').forEach(el => {
    const v = map[el.dataset.fill];
    if (!v) return;
    el.classList.add('filled');
    if (el.dataset.fill === 'phone') el.innerHTML = `<a href="${telHref(v)}">${v}</a>`;
    else if (el.dataset.fill === 'email') el.innerHTML = `<a href="mailto:${v}">${v}</a>`;
    else el.textContent = v;
  });
  if (CONFIG.PHONE) {
    $$('[data-phone-pill]').forEach(s => {
      const a = document.createElement('a');
      a.className = 'btn btn-lg btn-ghost'; a.href = telHref(CONFIG.PHONE); a.textContent = 'Call ' + CONFIG.PHONE;
      s.replaceWith(a);
    });
  }
}

/* ---------- header, drawer, scroll wire ---------- */
function header() {
  const head = $('#head'), wire = $('.head-wire span');
  const btn = $('.menu-btn'), drawer = $('#drawer');
  const onScroll = () => {
    head.classList.toggle('solid', scrollY > 30 || !drawer.hidden);
    const max = document.documentElement.scrollHeight - innerHeight;
    wire.style.setProperty('--sp', (max > 0 ? scrollY / max * 100 : 0) + '%');
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const set = open => {
    btn.setAttribute('aria-expanded', open); drawer.hidden = !open; onScroll();
    $('.sr', btn).textContent = open ? 'Close menu' : 'Open menu';
    if (open) $('a', drawer).focus();
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  drawer.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) { set(false); btn.focus(); } });
}

/* ---------- panel: breakers = services ---------- */
const selected = new Set();
let current = SERVICES[0].id;
const label = id => (SERVICES.find(s => s.id === id) || { label: 'Something else' }).label;

function panel() {
  const pnl = $('#panel'), card = $('#circuit'), layout = $('.svc-layout'), live = $('#panelLive');
  const announce = id => { live.textContent = `${label(id)} ${selected.has(id) ? 'added to' : 'removed from'} your quote.`; };
  const inline = () => narrow();
  if (inline()) card.hidden = true;
  $$('.brk').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.id;
    toggle(id); announce(id);
    if (inline() && !selected.has(id)) { if (current === id) card.hidden = true; return; }
    card.hidden = false;
    show(id, b);
    if (selected.has(id) && !reduce) { b.classList.remove('zap'); void b.offsetWidth; b.classList.add('zap'); }
  }));
  $('#circuitToggle').addEventListener('click', e => {
    const id = e.currentTarget.dataset.id; toggle(id); announce(id);
    if (inline() && !selected.has(id)) { card.hidden = true; const b = $(`.brk[data-id="${id}"]`); if (b) b.focus({ preventScroll: true }); }
  });
  $('#panelGo').addEventListener('click', e => { e.preventDefault(); goForm(); });
  // hero panel directory: pick a circuit, land on the panel with it switched on
  $$('[data-pick]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.dataset.pick;
    selected.add(id); panel.sync(); announce(id);
    $('#services').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    show(id, $(`.brk[data-id="${id}"]`), true);
  }));
  matchMedia('(max-width:1080px)').addEventListener('change', () => {
    if (!narrow()) { card.hidden = false; if (card.parentNode !== layout) layout.appendChild(card); }
    else if (!selected.has(current)) card.hidden = true;
  });

  // on phones and tablets the details open right under the tapped breaker
  function place(brk, quiet) {
    if (narrow() && brk) {
      if (brk.nextElementSibling !== card) brk.after(card);
      if (!quiet) setTimeout(() => card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }), reduce ? 0 : 260);
    } else if (card.parentNode !== layout) layout.appendChild(card);
  }
  function show(id, brk, quiet) {
    place(brk, quiet);
    if (id === current) return syncCard();
    current = id;
    panel.sync();
    const s = SERVICES.find(x => x.id === id);
    card.classList.add('swap');
    setTimeout(() => {
      const img = $('#circuitImg');
      img.src = s.img; img.alt = s.alt;
      $('#circuitNo').textContent = 'Circuit ' + (SERVICES.indexOf(s) + 1);
      $('#circuitTitle').textContent = s.title;
      $('#circuitText').textContent = s.text;
      $('#circuitList').innerHTML = s.list.map(li => `<li>${li}</li>`).join('');
      $('#circuitNote').innerHTML = `<b>Good to know:</b> ${s.note}`;
      $('#circuitToggle').dataset.id = id;
      syncCard();
      requestAnimationFrame(() => card.classList.remove('swap'));
    }, reduce ? 0 : 220);
  }
  function syncCard() {
    const on = selected.has(current), t = $('#circuitToggle');
    t.classList.toggle('on', on);
    t.textContent = on ? 'On: in your quote (tap to remove)' : 'Switch on: add to my quote';
  }
  panel.sync = () => {
    $$('.brk').forEach(b => {
      const on = selected.has(b.dataset.id);
      b.setAttribute('aria-pressed', on);
      b.classList.toggle('cur', b.dataset.id === current);
      $('.brk-flag', b).textContent = on ? 'On' : 'Off';
    });
    const n = [...selected].filter(id => id !== 'other').length;
    pnl.classList.toggle('live', n > 0);
    $('#panelCount').textContent = n ? `${n} circuit${n > 1 ? 's' : ''} on` : 'Select a service below to get started';
    $('#panelHint').textContent = n ? 'Added to the quote form below.' : 'Each service you switch on goes into your quote.';
    syncCard();
    chipsSync();
  };
  panel.sync();
}
function toggle(id) { selected.has(id) ? selected.delete(id) : selected.add(id); panel.sync(); }
function goForm() {
  $('#qform').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => $('#f-name').focus({ preventScroll: true }), reduce ? 0 : 700);
}

/* ---------- quote form chips ---------- */
function chips() {
  const wrap = $('#chips');
  const all = [...SERVICES.map(s => ({ id: s.id, label: s.label })), { id: 'other', label: 'Something else' }];
  wrap.innerHTML = all.map(c => `<button type="button" class="chip" data-id="${c.id}" aria-pressed="false">${c.label}</button>`).join('');
  wrap.addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) toggle(c.dataset.id); });
}
function chipsSync() { $$('.chip').forEach(c => c.setAttribute('aria-pressed', selected.has(c.dataset.id))); }

/* ---------- before / after ---------- */
function beforeAfter() {
  const ba = $('#ba'), r = $('#baRange');
  const set = v => ba.style.setProperty('--pos', v + '%');
  const base = +r.value;
  r.addEventListener('input', () => set(r.value));
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      let t0 = null;
      const step = ts => {
        if (t0 === null) t0 = ts;
        const k = Math.min((ts - t0) / 2200, 1);
        const v = base + (92 - base) * Math.pow(1 - k, 3);
        set(v); r.value = v;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: .6 });
    io.observe(ba);
  }
}

/* ---------- process wire ---------- */
function process() {
  const steps = $('#steps'), items = $$('.step', steps);
  const onScroll = () => {
    const r = steps.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (innerHeight * .75 - r.top) / (r.height + innerHeight * .2)));
    steps.style.setProperty('--p', p.toFixed(3));
    items.forEach((it, i) => {
      const on = narrow() ? it.getBoundingClientRect().top < innerHeight * .75 : p >= i / items.length + .02;
      it.classList.toggle('lit', on);
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
}

/* ---------- quote form ---------- */
function form() {
  const f = $('#qform'), err = $('#formErr'), done = $('#formDone');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const showErr = (msg, focus) => { err.textContent = msg; err.hidden = false; if (focus) $(focus).focus(); };
  const finish = html => { done.innerHTML = html; done.hidden = false; done.focus(); };
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const picked = [...selected].map(label);
    err.hidden = true;
    if (!d.name.trim()) return showErr('Please add your name.', '#f-name');
    if (!d.phone.trim() && !d.email.trim()) return showErr('Please add a phone number or email so we can reply.', '#f-phone');
    const body = [
      `Name: ${d.name}`, `Phone: ${d.phone || '-'}`, `Email: ${d.email || '-'}`, `Address/area: ${d.where || '-'}`,
      `Services: ${picked.join(', ') || '-'}`, `How soon: ${d.when}`, '', d.message || ''
    ].join('\n');

    if (CONFIG.FORM_ENDPOINT) {
      try {
        const fd = new FormData(f); fd.append('services', picked.join(', '));
        const res = await fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
        if (!res.ok) throw 0;
        return finish(`<b>Sent.</b> Thanks, ${esc(d.name.split(' ')[0])}. Heath Electric will be in touch with your quote.`);
      } catch { return showErr('That didn’t send. Please try again in a moment.'); }
    }
    if (CONFIG.EMAIL) {
      location.href = `mailto:${CONFIG.EMAIL}?subject=${encodeURIComponent('Quote request: ' + (picked.join(', ') || 'electrical work'))}&body=${encodeURIComponent(body)}`;
      return finish('<b>Your email app should open with everything filled in.</b> Press send there to finish.');
    }
    finish(`<b>Preview only:</b> this form will send straight to Heath Electric once the contact details are added. Here’s what Heath Electric would receive:<br><br><span style="white-space:pre-line;font-family:var(--mono);font-size:13px">${esc(body)}</span>`);
  });
}

/* ---------- job photo lightbox ---------- */
function lightbox() {
  const dlg = $('#lb'); if (!dlg || !dlg.showModal) return;
  $$('.job-open').forEach(b => b.addEventListener('click', () => {
    const img = $('img', b), cap = b.parentNode.querySelector('.f-label').textContent;
    $('#lbImg').src = b.dataset.full; $('#lbImg').alt = img.alt; $('#lbCap').textContent = cap;
    dlg.showModal();
  }));
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
}

/* ---------- reveal on scroll ---------- */
function reveal() {
  const els = $$('.sec-head, .panel, .circuit, .ba, .frame, .step, .about-copy, .about-photo, .qa, .qform, .quote-side, .quote-info');
  if (reduce || !('IntersectionObserver' in window)) return;
  els.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el, i) => { el.style.transitionDelay = (el.classList.contains('frame') || el.classList.contains('step')) ? (i % 3) * 80 + 'ms' : ''; io.observe(el); });
  setTimeout(() => els.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 1500);
  addEventListener('beforeprint', () => els.forEach(el => el.classList.add('in')));
}

fillFacts(); header(); lightbox(); chips(); panel(); beforeAfter(); process(); form(); reveal();
