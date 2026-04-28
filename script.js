(() => {
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting){ e.target.classList.add('reveal'); io.unobserve(e.target); }
  }, { threshold: .25 });
  document.querySelectorAll('.content').forEach(el => io.observe(el));
})();

(() => {
  const EXTS = ['.png','.jpg','.jpeg','.webp'];
  const PLACE = 'https://api.dicebear.com/9.x/initials/svg?backgroundType=gradientLinear&seed=';
  document.querySelectorAll('img[data-img]').forEach(el=>{
    const data = el.getAttribute('data-img')||''; const base = data.replace(/\.(png|jpe?g|webp)$/i,'');
    const name = el.getAttribute('data-name') || el.alt || base || 'X';
    const extAttr = (data.match(/\.[a-z]+$/i)||[])[0];
    const cand = []; if(extAttr){cand.push(`img/${base}${extAttr}`,`${base}${extAttr}`)}
    for(const ex of EXTS){cand.push(`img/${base}${ex}`,`${base}${ex}`)}
    (function next(i){ if(i>=cand.length){el.src=PLACE+encodeURIComponent(name);return;}
      const t=new Image(); t.onload=()=>el.src=cand[i]; t.onerror=()=>next(i+1); t.src=cand[i]; })(0);
  });
})();

(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const sent = document.getElementById('sent');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const okName = name.value.trim().length > 0;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (okName && okEmail){
      sent.hidden = false;
      form.reset();
    } else {
      sent.hidden = true;
      alert('Fyll i namn och en giltig e-postadress.');
    }
  });
})();
