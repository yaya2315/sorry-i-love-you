/* ═══════════════════════════════════════════════════════════
   CONFIGURACIÓN — RELLENA ESTO PARA QUE EL CORREO LLEGUE
   (instrucciones detalladas al final del mensaje del chat)
═══════════════════════════════════════════════════════════ */
console.log('%c✅ script.js cargó correctamente 🐾', 'color:#C96B8A;font-weight:bold;');

const EMAIL_CONFIG = {
  publicKey:  'L2g8ByGD0M3HyWWI4', // ✅ tu Public Key
  serviceId:  'service_a35xinh',   // ✅ tu Service ID
  templateId: 'template_szzcqfp',  // ✅ tu Template ID
};
// Correo de respaldo (se usa solo si EmailJS no está configurado o falla):
const FALLBACK_EMAIL = 'leonardovega2331@gmail.com';

/* ═══════════════════════════════════════════════════════════
   REGALITOS  (todas las imágenes menos los Snoopy)
═══════════════════════════════════════════════════════════ */
const GIFTS = [
  { id: 'abracitos',  img: 'imagenes/abracito.png',   name: 'Abracitos',     emoji: '🤗', desc: 'Un montón de abrazos apretados' },
  { id: 'besitos',    img: 'imagenes/besito.png',     name: 'Besitos',       emoji: '😘', desc: 'Mil besitos para ti' },
  { id: 'cartita',    img: 'imagenes/cartita.png',    name: 'Una cartita',   emoji: '💌', desc: 'Una carta escrita a mano' },
  { id: 'dulces',     img: 'imagenes/chocolate.png',  name: 'Dulces',        emoji: '🍫', desc: 'Chocolatitos y dulces' },
  { id: 'coca',       img: 'imagenes/coca.png',       name: 'Una Coca',      emoji: '🥤', desc: 'Una Coca bien fría' },
  { id: 'comidita',   img: 'imagenes/comidita.png',   name: 'Comidita',      emoji: '🍔', desc: 'Te invito a comer rico' },
  { id: 'postrecito', img: 'imagenes/postrecito.png', name: 'Un postrecito', emoji: '🍪', desc: 'El postre que más te guste' },
  { id: 'sorpresa',   img: 'imagenes/sorpresa.png',   name: 'Sorpresa',      emoji: '🎁', desc: 'Una sorpresita misteriosa' },
];

/* Imágenes de Snoopy que rotan en la pantalla principal */
const SNOOPY_IMGS = ['imagenes/snoopy.png', 'imagenes/snoopy1.png', 'imagenes/snoopy2.png', 'imagenes/snoopy3.png'];
let snoopyIdx = 0;

/* ═══════════════════════════════════════════════════════════
   CORAZONES FLOTANTES DE FONDO
═══════════════════════════════════════════════════════════ */
const bg = document.getElementById('heartsBg');
const symbols = ['💗','💕','🌸','✨','💞','🌷','💓'];
for (let i = 0; i < 18; i++) {
  const h = document.createElement('span');
  h.className = 'heart-particle';
  h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  h.style.cssText = `
    left:${Math.random() * 100}%; bottom:-30px;
    animation-duration:${6 + Math.random() * 10}s;
    animation-delay:${Math.random() * 10}s;
    font-size:${14 + Math.random() * 14}px;`;
  bg.appendChild(h);
}

/* ═══════════════════════════════════════════════════════════
   REFERENCIAS AL DOM
═══════════════════════════════════════════════════════════ */
const snoopy      = document.getElementById('snoopy');
const snoopyImg   = document.getElementById('snoopyImg');
const mainCard    = document.getElementById('mainCard');
const counter     = document.getElementById('clickCount');
const counterWrap = document.getElementById('counterWrap');
const finalScene  = document.getElementById('final-scene');
const yesScreen   = document.getElementById('yes-screen');
const giftScreen  = document.getElementById('gift-screen');
const sentScreen  = document.getElementById('sent-screen');
const btnYes      = document.getElementById('btnYes');
const btnNo       = document.getElementById('btnNo');
const btnGoGifts  = document.getElementById('btnGoGifts');
const giftGrid    = document.getElementById('giftGrid');
const btnConfirm  = document.getElementById('btnConfirmGift');
const giftHint    = document.getElementById('giftPickHint');

/* Inicializa EmailJS si hay credenciales reales */
const EMAIL_READY = !EMAIL_CONFIG.publicKey.startsWith('TU_');
if (EMAIL_READY && window.emailjs) {
  emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
}

/* ═══════════════════════════════════════════════════════════
   SNOOPY EN LOS BORDES
═══════════════════════════════════════════════════════════ */
const EDGES = [
  { id: 'top',    rot:  180 },
  { id: 'bottom', rot:    0 },
  { id: 'left',   rot:   90 },
  { id: 'right',  rot:  -90 },
];
const SIZE = Math.min(Math.max(window.innerWidth * 0.22, 90), 150);
const PEEK = Math.round(SIZE * 0.50);

let clicks = 0;
let lastEdge = -1;

function randomEdge() {
  let idx;
  do { idx = Math.floor(Math.random() * EDGES.length); } while (idx === lastEdge);
  lastEdge = idx;
  return EDGES[idx];
}

function placeSnoopy() {
  const W = window.innerWidth, H = window.innerHeight;
  const edge = randomEdge();
  const along = 0.15 + Math.random() * 0.70;

  snoopy.style.cssText = '';
  snoopy.classList.remove('peeking', 'wiggle');
  snoopy.style.width = SIZE + 'px';
  snoopy.style.height = SIZE + 'px';
  snoopy.style.display = 'block';

  const rot = edge.rot;
  switch (edge.id) {
    case 'top':
      snoopy.style.left = (along * (W - SIZE)) + 'px';
      snoopy.style.top  = -(SIZE - PEEK) + 'px';
      snoopy.style.transformOrigin = 'center bottom';
      break;
    case 'bottom':
      snoopy.style.left   = (along * (W - SIZE)) + 'px';
      snoopy.style.bottom = -(SIZE - PEEK) + 'px';
      snoopy.style.transformOrigin = 'center top';
      break;
    case 'left':
      snoopy.style.top  = (along * (H - SIZE)) + 'px';
      snoopy.style.left = -(SIZE - PEEK) + 'px';
      snoopy.style.transformOrigin = 'right center';
      break;
    case 'right':
      snoopy.style.top   = (along * (H - SIZE)) + 'px';
      snoopy.style.right = -(SIZE - PEEK) + 'px';
      snoopy.style.transformOrigin = 'left center';
      break;
  }

  snoopy.style.setProperty('--peek-from', `rotate(${rot}deg) scale(0.6)`);
  snoopy.style.setProperty('--peek-to',   `rotate(${rot}deg) scale(1)`);
  snoopy.style.transform = `rotate(${rot}deg)`;
  void snoopy.offsetWidth;
  snoopy.classList.add('peeking');
}
placeSnoopy();

/* Avanza a la siguiente imagen de Snoopy */
function nextSnoopy() {
  snoopyIdx = (snoopyIdx + 1) % SNOOPY_IMGS.length;
  snoopyImg.src = SNOOPY_IMGS[snoopyIdx];
}

/* Clic / Enter / Espacio sobre Snoopy */
function tapSnoopy() {
  clicks++;
  counter.textContent = clicks;

  if (clicks >= 10) { showFinalScene(); return; }

  snoopy.classList.remove('peeking');
  snoopy.classList.add('wiggle');
  setTimeout(() => {
    snoopy.style.display = 'none';
    nextSnoopy();                 // cambia la imagen de Snoopy
    setTimeout(placeSnoopy, 80);
  }, 200);
}
snoopy.addEventListener('click', tapSnoopy);
snoopy.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapSnoopy(); }
});

/* ═══════════════════════════════════════════════════════════
   ESCENA FINAL (clic nº 10)
═══════════════════════════════════════════════════════════ */
function showFinalScene() {
  snoopy.style.display = 'none';
  mainCard.classList.add('hidden');
  counterWrap.classList.add('gone');
  finalScene.classList.add('show');
  finalScene.setAttribute('aria-hidden', 'false');
  launchConfetti();
  initShrinkingNo();
}

/* ── Botón "No" que se encoge ── */
const NO_MESSAGES = ['No', '¿Segura? 🙈', 'Piénsalo 🥺', '¿En serio?', 'No seas así 😢', 'Porfa… 🥺', '🥺💔', ''];
let noLevel = 0, noBound = false;

function initShrinkingNo() {
  noLevel = 0;
  btnNo.textContent = NO_MESSAGES[0];
  btnNo.style.setProperty('--no-scale', '1.45');
  btnYes.style.setProperty('--yes-scale', '1');
  btnNo.style.opacity = '1';
  btnNo.style.pointerEvents = 'auto';
  if (!noBound) { btnNo.addEventListener('click', shrinkNo); noBound = true; }
}
function shrinkNo() {
  noLevel++;
  const noScale  = Math.max(1.45 - noLevel * 0.20, 0.10);
  const yesScale = Math.min(1 + noLevel * 0.16, 1.9);
  btnNo.style.setProperty('--no-scale', noScale.toFixed(2));
  btnYes.style.setProperty('--yes-scale', yesScale.toFixed(2));
  btnNo.textContent = NO_MESSAGES[Math.min(noLevel, NO_MESSAGES.length - 1)];
  btnYes.classList.remove('bump'); void btnYes.offsetWidth; btnYes.classList.add('bump');
  if (noLevel >= NO_MESSAGES.length - 1) {
    btnNo.style.opacity = '0'; btnNo.style.pointerEvents = 'none';
    launchConfetti(20);
  }
}

/* ═══════════════════════════════════════════════════════════
   BOTÓN "SÍ" → PANTALLA DE GRACIAS
═══════════════════════════════════════════════════════════ */
btnYes.addEventListener('click', () => {
  finalScene.classList.remove('show');
  finalScene.setAttribute('aria-hidden', 'true');
  yesScreen.classList.add('show');
  yesScreen.setAttribute('aria-hidden', 'false');
  launchConfetti(60);
});

/* PANTALLA DE GRACIAS → REGALITOS */
btnGoGifts.addEventListener('click', () => {
  yesScreen.classList.remove('show');
  yesScreen.setAttribute('aria-hidden', 'true');
  giftScreen.classList.add('show');
  giftScreen.setAttribute('aria-hidden', 'false');
  buildGifts();
});

/* ═══════════════════════════════════════════════════════════
   PANTALLA DE REGALITOS
═══════════════════════════════════════════════════════════ */
let selectedGift = null;

function buildGifts() {
  if (giftGrid.childElementCount) return;   // construir solo una vez
  GIFTS.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Elegir ${g.name}`);
    card.style.setProperty('--d', (i * 0.06) + 's');
    card.innerHTML = `
      <span class="check" aria-hidden="true">✓</span>
      <div class="gift-thumb"><img src="${g.img}" alt="${g.name}" loading="lazy"></div>
      <span class="gift-name">${g.emoji} ${g.name}</span>
      <span class="gift-desc">${g.desc}</span>`;
    const choose = () => selectGift(g, card);
    card.addEventListener('click', choose);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(); }
    });
    giftGrid.appendChild(card);
  });
}

function selectGift(gift, card) {
  selectedGift = gift;
  document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  btnConfirm.disabled = false;
  giftHint.textContent = `Elegiste: ${gift.emoji} ${gift.name}`;
}

/* Confirmar → enviar correo → pantalla de confirmación */
btnConfirm.addEventListener('click', async () => {
  if (!selectedGift) return;
  btnConfirm.classList.add('is-sending');
  btnConfirm.textContent = 'Enviando… 💞';

  try { await sendGiftEmail(selectedGift); }
  catch (err) { console.warn('No se pudo enviar el correo:', err); }

  showSentScreen(selectedGift);
});

/* ── ENVÍO DEL CORREO ── */
async function sendGiftEmail(gift) {
  const fecha = new Date().toLocaleString('es-SV', { dateStyle: 'full', timeStyle: 'short' });

  // Estos nombres deben coincidir con las {{variables}} de tu plantilla EmailJS
  const params = {
    regalo:      gift.name,
    emoji:       gift.emoji,
    descripcion: gift.desc,
    fecha:       fecha,
    de:          'Tu niña 💗',
    name:        'Tu niña 💗',          // → From Name de la plantilla
    email:       'leonardovega2331@gmail.com', // → Reply To de la plantilla
    mensaje:     `¡Tu niña eligió su regalito! Quiere: ${gift.emoji} ${gift.name} — ${gift.desc}. (${fecha})`,
  };

  if (EMAIL_READY && window.emailjs) {
    return emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, params);
  }

  // Respaldo: si EmailJS no está configurado, abre el correo ya redactado
  const subject = encodeURIComponent(`💝 Tu niña eligió: ${gift.name}`);
  const body = encodeURIComponent(params.mensaje);
  window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  return Promise.resolve('mailto-fallback');
}

function showSentScreen(gift) {
  document.getElementById('sentCard').innerHTML =
    `<img src="${gift.img}" alt="${gift.name}"><span class="sc-name">${gift.emoji} ${gift.name}</span>`;
  giftScreen.classList.remove('show');
  giftScreen.setAttribute('aria-hidden', 'true');
  sentScreen.classList.add('show');
  sentScreen.setAttribute('aria-hidden', 'false');
  launchConfetti(70);
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI DE CORAZONES
═══════════════════════════════════════════════════════════ */
function launchConfetti(n = 30) {
  const confSymbols = ['💗','🌸','✨','💕','🌷','⭐','🎀'];
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const c = document.createElement('span');
      const dur = 2 + Math.random() * 3;
      c.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:-2rem;
        font-size:${18 + Math.random()*18}px; pointer-events:none; z-index:999;
        animation:floatUp ${dur}s linear forwards;`;
      c.textContent = confSymbols[Math.floor(Math.random() * confSymbols.length)];
      document.body.appendChild(c);
      setTimeout(() => c.remove(), dur * 1000 + 200);
    }, i * 60);
  }
}
