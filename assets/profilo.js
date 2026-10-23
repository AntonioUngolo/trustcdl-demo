// Scheda pubblica del consulente: menu di sezione, preventivo, prenotazione call.

// Voce del menu di sezione attiva mentre si scorre
const tabs = [...document.querySelectorAll('.tabs a')];
const sections = tabs.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) tabs.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(s => io.observe(s));

// Salva tra i preferiti
document.querySelectorAll('.save').forEach(b => b.addEventListener('click', () => {
  const on = b.getAttribute('aria-pressed') !== 'true';
  b.setAttribute('aria-pressed', on);
  b.innerHTML = on ? '<i class="ph-fill ph-heart"></i>Salvato' : '<i class="ph ph-heart"></i>Salva';
}));

// Filtri delle recensioni (solo stato visivo nella demo)
document.querySelectorAll('.rfilters button').forEach((b, _, all) => b.addEventListener('click', () => {
  all.forEach(x => x.classList.toggle('on', x === b));
}));

// Richiesta di preventivo con controllo minimo e stato di conferma
const quote = document.querySelector('.quote');
if (quote) {
  quote.addEventListener('submit', e => {
    e.preventDefault();
    const msg = quote.querySelector('textarea');
    const err = quote.querySelector('.err');
    if (msg.value.trim().length < 20) { err.hidden = false; msg.focus(); return; }
    err.hidden = true;
    quote.hidden = true;
    quote.parentElement.querySelector('.sent').hidden = false;
  });
}

// Prenotazione della call: giorno, orario, conferma
const days = document.querySelectorAll('.days button');
const slots = document.querySelectorAll('.slots button');
const book = document.querySelector('.book');
if (book) {
  const label = () => {
    const d = document.querySelector('.days button.on');
    const s = document.querySelector('.slots button.on');
    book.disabled = !s;
    book.textContent = s ? `Prenota ${d.querySelector('small').textContent.toLowerCase()} ${d.lastChild.textContent} alle ${s.textContent}` : 'Scegli un orario';
  };
  days.forEach(b => b.addEventListener('click', () => { days.forEach(x => x.classList.toggle('on', x === b)); label(); }));
  slots.forEach(b => b.addEventListener('click', () => { slots.forEach(x => x.classList.toggle('on', x === b)); label(); }));
  book.addEventListener('click', () => {
    book.innerHTML = '<i class="ph-bold ph-check"></i>Call prenotata, ti arriva l\'invito via email';
    book.disabled = true;
  });
}
