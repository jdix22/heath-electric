/* Heath Electric — site script
 *
 * FACTS (fill these in when the owner sends them; every "awaiting" spot on the page updates itself)
 */
const CONFIG = {
  PHONE: '',          // e.g. '(905) 555-0123'
  EMAIL: '',          // quote requests are emailed here (mailto) unless FORM_ENDPOINT is set
  HOURS: '',          // e.g. 'Mon–Fri 7 am–6 pm, emergencies by phone'
  AREA: '',           // e.g. 'Newmarket, Aurora, Richmond Hill and York Region'
  LICENCE: '',        // e.g. 'ECRA/ESA Licence #7000XXXX'
  INSURANCE: '',      // e.g. '$2M liability insurance'
  FORM_ENDPOINT: ''   // optional: Formspree/Basin URL; leave blank to use mailto
};

const IMG = (id, w = 1100) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

const SERVICES = [
  { id: 'panel', label: 'Panel upgrades', title: 'Panel upgrades & replacements',
    text: 'Moving from 100 A to 200 A, replacing an old fuse box or a panel your insurer has flagged, or adding a sub-panel for a basement, garage or addition.',
    list: ['Load check on what your home draws today and what you plan to add', 'Coordination with your utility for the disconnect and reconnect', 'New breakers, a tidy panel and a typed directory'],
    note: 'panel replacements always need an ESA permit and inspection. You’ll know what your job needs before you agree to anything.',
    img: IMG('1660330589693-99889d60181e'), alt: 'An electrician working inside an open residential breaker panel' },
  { id: 'ev', label: 'EV chargers', title: 'EV charger installs',
    text: 'A Level 2 charger in the garage or driveway on its own dedicated circuit, placed where the cable actually reaches the car.',
    list: ['Check of your panel’s spare capacity before anything is bought', 'Dedicated circuit and a weather-rated install outside', 'Help choosing a hardwired or plug-in charger'],
    note: 'many homes can add a charger without a panel upgrade. A load calculation tells you for sure.',
    img: IMG('1766507680004-1c71007aefe5'), alt: 'A wall-mounted electric car charger on a wooden fence' },
  { id: 'lighting', label: 'Pot lights & fixtures', title: 'Pot lights, fixtures & dimmers',
    text: 'Slim LED pot lights, pendants over the island, under-cabinet strips, dimmers that don’t buzz, and exterior lights on timers or sensors.',
    list: ['Layout planned for even light, not a grid of random holes', 'Minimal drywall patching through existing ceilings', 'Dimmers matched to the fixtures so nothing flickers'],
    note: 'warm white (2700–3000 K) suits most living spaces; cooler light suits garages and workshops.',
    img: IMG('1730991568658-ad8638395a9e'), alt: 'A bright kitchen with a white island and glass pendant lights' },
  { id: 'outlets', label: 'Outlets & switches', title: 'Outlets, switches & GFCIs',
    text: 'New outlets where you actually need them, USB-C and smart switches, GFCI protection in kitchens, baths and outdoors, and two-prong outlets brought up to date.',
    list: ['Added circuits where one is doing too much', 'GFCI and AFCI protection where the code calls for it', 'Cover plates straight, flush and level'],
    note: 'swapping a two-prong outlet for a three-prong one without a ground isn’t safe on its own. There are proper ways to fix it.',
    img: IMG('1587534012737-1fd8a84b519e'), alt: 'A white duplex wall outlet on a teal painted wall' },
  { id: 'reno', label: 'Reno & basement', title: 'Renovation & basement wiring',
    text: 'Rough-in for a basement finish, kitchen and bath renovations, moved walls and moved outlets, done on your contractor’s schedule.',
    list: ['Circuit plan before the drywall goes up', 'Rough-in ready for inspection on time', 'Final connections, devices and testing'],
    note: 'basement and kitchen renos usually need new dedicated circuits. Planning them early is cheaper than opening walls later.',
    img: IMG('1621905251189-08b45d6a269e'), alt: 'An electrician in a hard hat installing wiring at a wall box' },
  { id: 'trouble', label: 'Troubleshooting', title: 'Troubleshooting & repairs',
    text: 'Breakers that keep tripping, outlets that died, lights that flicker, switches that buzz or feel warm. Found, explained and fixed.',
    list: ['Fault traced with proper testing, not guesswork', 'A plain explanation of what failed and why', 'A fix price before the repair starts'],
    note: 'if something smells hot or you see scorch marks, switch off that breaker and don’t reset it until it’s been checked.',
    img: IMG('1758101755915-462eddc23f57'), alt: 'An electrician testing a breaker panel with a multimeter' },
  { id: 'alarms', label: 'Smoke & CO alarms', title: 'Smoke & CO alarms',
    text: 'Hardwired, interconnected smoke and carbon monoxide alarms, so when one sounds they all do.',
    list: ['Alarms on every storey and outside sleeping areas', 'Interconnection so a basement alarm is heard upstairs', 'Battery backup on every hardwired unit'],
    note: 'Ontario requires working smoke alarms on every storey and CO alarms outside sleeping areas in homes with a fuel-burning appliance or an attached garage.',
    img: IMG('1767672857994-73a27b723506'), alt: 'A box of new white smoke alarms with their mounting plates and instructions' },
  { id: 'outdoor', label: 'Outdoor & hot tub', title: 'Outdoor, garage & hot tub power',
    text: 'Weatherproof outlets, landscape and security lighting, power to the garage or shed, and hot tub and pool equipment hookups with the disconnect in the right place.',
    list: ['Buried or surface runs done to the right depth and rating', 'Hot tub disconnects placed where the code requires', 'Outdoor GFCI protection throughout'],
    note: 'a hot tub needs its own GFCI-protected circuit and a disconnect within sight of the tub, kept at least 1.5 m from the water. Plan the spot before the tub arrives.',
    img: IMG('1660330589827-da8ab7dd3c02'), alt: 'An electrician working on an outdoor electrical meter and panel' }
];

const TRIAGE = {
  burn: { sev: 'now', sevText: 'Emergency', title: 'Burning smell or smoke',
    steps: ['If you see smoke or flames, get everyone out and call 911.', 'If the smell is strong or you can’t find where it’s coming from, leave and call 911 from outside.', 'If it’s a faint smell from one spot and you can reach the panel safely, switch off that breaker, or the main. Don’t reset it until an electrician has checked the circuit.'],
    dont: 'Don’t touch outlets, plates or cords that feel hot, and never throw water on an electrical fire.',
    msg: 'There has been a burning smell from an outlet, switch or the panel.' },
  hot: { sev: 'today', sevText: 'Call today', title: 'Outlet hot, buzzing or sparking',
    steps: ['Stop using that outlet or switch.', 'Switch off its breaker at the panel before unplugging anything from it.', 'Note which room and what was plugged in. It helps find the fault quickly.'],
    dont: 'Don’t keep using a warm or buzzing outlet “just for now”. Heat at an outlet means a loose or failing connection.',
    msg: 'An outlet or switch has been hot, buzzing or sparking.' },
  trip: { sev: 'soon', sevText: 'Book soon', title: 'Breaker keeps tripping',
    steps: ['Unplug everything on that circuit, then reset the breaker once: push it fully to OFF, then ON.', 'Plug things back in one at a time. If one device trips it, that device is the problem.', 'If it trips with nothing plugged in, leave it off. That points to a wiring fault.'],
    dont: 'Don’t hold a breaker on, tape it, or swap in a bigger one. It’s sized to protect the wire.',
    msg: 'A breaker keeps tripping.' },
  flicker: { sev: 'soon', sevText: 'Book soon', title: 'Lights flicker or dim',
    steps: ['One light flickering? Try a new bulb, and check that it suits the dimmer.', 'A whole room or circuit? Note when it happens, e.g. when the furnace or dryer starts.', 'The whole house dims or flickers? Call your local utility too. The problem may be on their side.'],
    dont: 'Don’t ignore flickering that comes with a burning smell or a warm switch plate. That’s urgent: switch that circuit off.',
    msg: 'My lights are flickering or dimming.' },
  dead: { sev: 'soon', sevText: 'Check first', title: 'Part of the house has no power',
    steps: ['Check the panel for a breaker sitting in the middle position. Push it to OFF, then ON.', 'Press the RESET button on GFCI outlets in bathrooms, the kitchen, garage and outside. One GFCI can feed several outlets.', 'Still dead? Book a visit. It may be a loose connection.'],
    dont: 'Don’t open the panel cover or remove outlet plates to look for the problem.',
    msg: 'Part of my house has no power.' },
  water: { sev: 'now', sevText: 'Emergency', title: 'Water near wiring or the panel',
    steps: ['Keep everyone out of water that is near outlets, cords or the panel.', 'If the panel is dry and you can reach it without standing in water, switch off the main breaker.', 'If the panel is wet or you’d have to stand in water, don’t touch it. Call your utility to cut power, or 911 if anyone is at risk.'],
    dont: 'Don’t use anything that has been under water, even after it dries, until it’s been checked.',
    msg: 'There has been water near the wiring or the panel.' }
};

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
let current = 'panel';
const label = id => (SERVICES.find(s => s.id === id) || { label: 'Something else' }).label;

function panel() {
  const pnl = $('#panel'), card = $('#circuit'), layout = $('.svc-layout'), live = $('#panelLive');
  const announce = id => { live.textContent = `${label(id)} ${selected.has(id) ? 'added to' : 'removed from'} your quote.`; };
  $$('.brk').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.id;
    toggle(id); announce(id);
    show(id, b);
    if (selected.has(id) && !reduce) { b.classList.remove('zap'); void b.offsetWidth; b.classList.add('zap'); }
  }));
  $('#circuitToggle').addEventListener('click', e => { const id = e.currentTarget.dataset.id; toggle(id); announce(id); });
  $('#panelGo').addEventListener('click', e => { e.preventDefault(); goForm(); });
  // hero panel directory: pick a circuit, land on the panel with it switched on
  $$('[data-pick]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.dataset.pick;
    selected.add(id); panel.sync(); announce(id);
    $('#services').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    show(id, $(`.brk[data-id="${id}"]`), true);
  }));
  matchMedia('(max-width:1080px)').addEventListener('change', () => { if (!narrow() && card.parentNode !== layout) layout.appendChild(card); });

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
      $('#circuitNo').textContent = 'Circuit ' + String(SERVICES.indexOf(s) + 1).padStart(2, '0');
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
    $('#panelCount').textContent = n ? `${n} circuit${n > 1 ? 's' : ''} on` : 'All circuits off';
    $('#panelHint').textContent = n ? 'Added to the quote form below.' : 'Flip a breaker on to add it to your quote.';
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
  r.addEventListener('input', () => set(r.value));
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      let t0 = null;
      const step = ts => {
        if (t0 === null) t0 = ts;
        const k = Math.min((ts - t0) / 1600, 1);
        const v = 50 + Math.sin(k * Math.PI * 2) * 18 * (1 - k);
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

/* ---------- safety triage ---------- */
let lastTriageMsg = '';
function triage() {
  const box = $('#advice'), home = box.parentNode;
  $$('.sym').forEach(b => b.addEventListener('click', () => {
    $$('.sym').forEach(x => x.setAttribute('aria-pressed', x === b));
    const t = TRIAGE[b.dataset.sym], now = t.sev === 'now';
    const call = CONFIG.PHONE ? `<a class="btn ${now ? 'btn-ghost' : 'btn-gold'}" href="${telHref(CONFIG.PHONE)}">Call ${CONFIG.PHONE}</a>` : '';
    const acts = now
      ? `<a class="btn btn-danger" href="tel:911">Call 911</a>${call}<button type="button" class="btn btn-outline" data-send>Message Heath Electric</button><span class="btn-small-note">A message is not an emergency call. If there’s danger, call 911 or your local utility first.</span>`
      : `${call}<button type="button" class="btn ${call ? 'btn-ghost' : 'btn-gold'}" data-send>Send this to Heath Electric</button>`;
    box.innerHTML = `
      <span class="sev sev-${t.sev}">${t.sevText}</span>
      <h3>${t.title}</h3>
      <ol>${t.steps.map(s => `<li>${s}</li>`).join('')}</ol>
      <p class="dont"><b>Don’t:</b> ${t.dont.replace(/^Don’t /, '')}</p>
      <div class="acts">${acts}</div>
      <p class="fine">General safety guidance only. If anyone is in danger, call 911.</p>`;
    if (narrow()) {
      if (b.nextElementSibling !== box) b.after(box);
      setTimeout(() => box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }), 60);
    } else if (box.parentNode !== home) home.appendChild(box);
    $('[data-send]', box).addEventListener('click', () => {
      selected.add('trouble'); panel.sync();
      const m = $('#f-msg');
      let rest = m.value;
      if (lastTriageMsg && rest.startsWith(lastTriageMsg)) rest = rest.slice(lastTriageMsg.length).replace(/^\n+/, '');
      m.value = t.msg + (rest ? '\n\n' + rest : '\n\n');
      lastTriageMsg = t.msg;
      if (t.sev !== 'soon') { const asap = $('input[name="when"][value="As soon as possible"]'); if (asap) asap.checked = true; }
      goForm();
    });
  }));
  matchMedia('(max-width:1080px)').addEventListener('change', () => { if (!narrow() && box.parentNode !== home) home.appendChild(box); });
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

/* ---------- reveal on scroll ---------- */
function reveal() {
  const els = $$('.sec-head, .panel, .circuit, .ba, .frame, .step, .triage, .about-copy, .about-photo, .qa, .qform, .quote-side, .quote-info');
  if (reduce || !('IntersectionObserver' in window)) return;
  els.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el, i) => { el.style.transitionDelay = (el.classList.contains('frame') || el.classList.contains('step')) ? (i % 3) * 80 + 'ms' : ''; io.observe(el); });
  setTimeout(() => els.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 1500);
  addEventListener('beforeprint', () => els.forEach(el => el.classList.add('in')));
}

fillFacts(); header(); chips(); panel(); beforeAfter(); process(); triage(); form(); reveal();
