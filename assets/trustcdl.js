// TrustCDL, comportamenti condivisi delle pagine interne della demo.

// Stelle a quadratini: riempimento parziale sull'ultimo quadrato
function renderStars(root = document) {
  root.querySelectorAll('.stars[data-r]').forEach(el => {
    const r = parseFloat(el.dataset.r);
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', `${String(r).replace('.', ',')} stelle su 5`);
    el.innerHTML = Array.from({ length: 5 }, (_, i) => {
      const p = Math.max(0, Math.min(1, r - i)) * 100;
      return `<span style="--p:${p}%"><i class="ph-fill ph-star"></i></span>`;
    }).join('');
  });
}
renderStars();

// Ombra della barra solo dopo l'inizio dello scroll
const nav = document.querySelector('.nav');
if (nav) {
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:8px;width:1px';
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => nav.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);
}

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const mmenu = document.getElementById('mmenu');
if (menuBtn && mmenu) {
  const setMenu = open => {
    mmenu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.innerHTML = open ? '<i class="ph-bold ph-x"></i>' : '<i class="ph-bold ph-list"></i>';
  };
  menuBtn.addEventListener('click', () => setMenu(mmenu.hidden));
  mmenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
}

// Interruttore "Mostra differenze tra i piani" (solo demo)
const planToggle = document.querySelector('.plan-toggle');
if (planToggle) {
  planToggle.addEventListener('click', () => {
    const on = document.body.classList.toggle('show-plans');
    planToggle.setAttribute('aria-pressed', on);
  });
}
