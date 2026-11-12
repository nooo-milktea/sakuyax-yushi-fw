const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const io = new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
$$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 5) * 60 + 'ms'; io.observe(el); });

function addMemo(e) {
  e.preventDefault();
  const inp = $('#memoInput');
  const v = inp.value.trim();
  if (!v) return;
  const li = document.createElement('li');
  const b = document.createElement('b');
  b.textContent = '我';
  const s = document.createElement('span');
  s.textContent = v;
  li.append(b, s);
  $('#mlist').prepend(li);
  inp.value = '';
}

/* 首屏卡片轻微跟随鼠标 */
const cards = $$('.tcard');
if (cards.length && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5);
    const cy = (e.clientY / window.innerHeight - 0.5);
    cards.forEach((c, i) => {
      const k = i === 0 ? 1 : -1;
      c.style.transform = `rotate(${(i === 0 ? -4 : 4) - cx * 4 * k}deg) translate(${cx * 10 * k}px, ${cy * 8}px)`;
    });
  });
}
