const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

let z = 90;
function focusWin(w) {
  z += 1;
  w.style.zIndex = z;
}

function openWin(id) {
  const w = document.getElementById(id);
  if (!w) return;
  w.classList.add('on');
  focusWin(w);
  // 居中偏上，避免超出屏幕
  const r = w.getBoundingClientRect();
  if (!w.dataset.placed) {
    w.dataset.placed = '1';
    const left = Math.max(12, Math.min(window.innerWidth - r.width - 12, (window.innerWidth - r.width) / 2));
    const top = Math.max(72, Math.min(window.innerHeight - r.height - 24, (window.innerHeight - r.height) / 2 - 20));
    w.style.left = left + 'px';
    w.style.top = top + 'px';
  }
}

function closeWin(id) {
  const w = document.getElementById(id);
  if (w) w.classList.remove('on');
}

function closeAll() {
  $$('.win').forEach((w) => w.classList.remove('on'));
}

/* 拖动 */
$$('.win').forEach((w) => {
  w.addEventListener('mousedown', () => focusWin(w));
  const bar = $('.bar', w);
  let sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;

  const start = (e) => {
    if (e.target.closest('.x')) return;
    dragging = true;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY;
    const r = w.getBoundingClientRect();
    ox = r.left; oy = r.top;
    w.style.left = ox + 'px';
    w.style.top = oy + 'px';
  };
  const move = (e) => {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    const nx = Math.min(window.innerWidth - 80, Math.max(-40, ox + p.clientX - sx));
    const ny = Math.min(window.innerHeight - 60, Math.max(40, oy + p.clientY - sy));
    w.style.left = nx + 'px';
    w.style.top = ny + 'px';
    if (e.cancelable) e.preventDefault();
  };
  const end = () => { dragging = false; };

  bar.addEventListener('mousedown', start);
  bar.addEventListener('touchstart', start, { passive: true });
  window.addEventListener('mousemove', move);
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', end);
  window.addEventListener('touchend', end);
});

/* 留言 */
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

/* 音乐占位 */
function toggleMusic(btn) {
  btn.classList.toggle('on');
  btn.textContent = btn.classList.contains('on') ? '❚❚' : '♪';
}

/* 打开第一个窗口作为引导 */
window.addEventListener('load', () => {
  setTimeout(() => openWin('w-album'), 600);
});
