/* ==========================================================
   DJANTER CAPITAL SpA — script compartido
   CONFIG — EDITA SOLO ESTAS LÍNEAS
   Los datos de contacto también están escritos en el HTML
   (para Google); si cambias algo aquí, cámbialo también allá.
   ========================================================== */
const CONFIG = {
  email:     "jbustos@djantercapital.cl",
  telefono:  "+56 9 9774 9508",
  whatsapp:  "56997749508",                 // solo dígitos con código país
  horario:   "lunes a viernes, 9:00 a 18:00 h",
  asunto:    "Consulta desde el sitio web — Djanter Capital SpA"
};
/* ====================== FIN DE CONFIG ====================== */

(function(){
  "use strict";
  const $  = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> Array.from((c||document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;

  /* ---- enlaces de contacto (todas las páginas) ---- */
  const clean = s => (s||'').replace(/[^\d+]/g,'');
  const wspMsg = document.body.getAttribute('data-wsp') ||
    'Hola, escribo desde el sitio web de Djanter Capital. Me gustaría solicitar una propuesta.';
  $$('[data-cfg]').forEach(el=>{
    const v = CONFIG[el.getAttribute('data-cfg')];
    if(v) el.textContent = v;
  });
  $$('[data-contact="mail"]').forEach(a=>a.setAttribute('href','mailto:'+CONFIG.email+'?subject='+encodeURIComponent(CONFIG.asunto)));
  $$('[data-contact="wsp"]').forEach(a=>a.setAttribute('href','https://wa.me/'+clean(CONFIG.whatsapp).replace(/\+/g,'')+'?text='+encodeURIComponent(wspMsg)));
  $$('[data-contact="tel"]').forEach(a=>a.setAttribute('href','tel:'+clean(CONFIG.telefono)));
  const yr = $('#yr'); if(yr) yr.textContent = new Date().getFullYear();

  /* ---- preloader (solo existe en la portada) ---- */
  const pre = $('#pre');
  const bars = $('#bars');
  const finish = ()=>{
    if(pre){
      if(pre.classList.contains('done')) return;
      pre.classList.add('done');
      setTimeout(()=>{ pre.classList.add('gone'); }, 900);
    }
    document.body.classList.remove('is-loading');
    if(!reduce && bars) setTimeout(()=>bars.classList.add('entrance-done'), 1700);
    startReveal();
  };
  if(pre){
    const skip = $('#skip'); if(skip) skip.addEventListener('click', finish);
    if(reduce){ finish(); } else { setTimeout(finish, 2500); }
    window.addEventListener('keydown', e=>{ if(e.key==='Escape') finish(); }, {once:true});
  }

  /* ---- header + barra de progreso + parallax del hero + barras reactivas ---- */
  const hdr = $('#hdr');
  const scrollFill = $('#scrollbarFill');
  const heroParallax = $('#heroParallax');
  const barEls = $$('#bars i');
  let rafPending = false;

  function applyScrollEffects(){
    rafPending = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const sy = window.scrollY;
    const pct = scrollable > 0 ? Math.min(sy / scrollable, 1) : 0;
    if(scrollFill) scrollFill.style.width = (pct * 100) + '%';
    if(!reduce){
      if(heroParallax) heroParallax.style.transform = 'translate3d(0,' + Math.min(sy * 0.18, 140) + 'px,0)';
      if(barEls.length && bars && bars.classList.contains('entrance-done')){
        const grow = 1 + pct * 0.55;
        barEls.forEach(el => el.style.transform = 'scaleY(' + grow + ')');
      }
    }
  }
  const onScroll = ()=>{
    if(hdr) hdr.classList.toggle('stuck', window.scrollY > 24);
    if(!rafPending){ rafPending = true; requestAnimationFrame(applyScrollEffects); }
  };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  window.addEventListener('resize', applyScrollEffects, {passive:true});

  /* ---- sección activa en el menú (portada) ---- */
  const navLinks = $$('nav.main a');
  const navMap = new Map();
  navLinks.forEach(a=>{
    const h = a.getAttribute('href') || '';
    const i = h.indexOf('#');
    if(i < 0 || (h.slice(0,i) && h.slice(0,i) !== location.pathname)) return;
    const sec = document.getElementById(h.slice(i+1));
    if(sec) navMap.set(sec, a);
  });
  if('IntersectionObserver' in window && navMap.size){
    const navIO = new IntersectionObserver(ents=>{
      ents.forEach(e=>{
        if(!e.isIntersecting) return;
        const a = navMap.get(e.target);
        if(!a) return;
        navLinks.forEach(l=>l.classList.remove('active'));
        a.classList.add('active');
      });
    }, {rootMargin:'-40% 0px -55% 0px', threshold:0});
    navMap.forEach((a,sec)=>navIO.observe(sec));
  }

  /* ---- menú móvil ---- */
  const burger=$('#burger'), mob=$('#mob'), scrim=$('#scrim');
  if(burger && mob && scrim){
    const toggleMenu = (force)=>{
      const on = force!==undefined ? force : !mob.classList.contains('on');
      mob.classList.toggle('on', on); scrim.classList.toggle('on', on);
      burger.classList.toggle('on', on); burger.setAttribute('aria-expanded', String(on));
      document.body.style.overflow = on ? 'hidden' : '';
    };
    burger.addEventListener('click', ()=>toggleMenu());
    scrim.addEventListener('click', ()=>toggleMenu(false));
    $$('#mob a').forEach(a=>a.addEventListener('click', ()=>toggleMenu(false)));
  }

  /* ---- reveal + contadores ---- */
  function startReveal(){
    if(started) return; started = true;
    const items = $$('.rv');
    if(!('IntersectionObserver' in window) || reduce){
      items.forEach(el=>el.classList.add('in')); $$('[data-count]').forEach(b=>count(b,true)); return;
    }
    const io = new IntersectionObserver((ents)=>{
      ents.forEach((e,i)=>{
        if(!e.isIntersecting) return;
        const el = e.target;
        el.style.transitionDelay = Math.min(i*70, 280)+'ms';
        el.classList.add('in');
        $$('[data-count]', el).forEach(b=>count(b));
        io.unobserve(el);
      });
    }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
    items.forEach(el=>io.observe(el));
  }
  function count(b, instant){
    if(b.dataset.done) return; b.dataset.done = '1';
    const target = parseFloat(b.dataset.count), sfx = b.dataset.suffix || '';
    if(instant){ b.textContent = target + sfx; return; }
    const dur = 1300, t0 = performance.now();
    const tick = (t)=>{
      const p = Math.min((t-t0)/dur, 1);
      const e = 1 - Math.pow(1-p, 3);
      b.textContent = Math.round(target*e) + sfx;
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if(!pre) startReveal();

  /* ---- acordeón: uno abierto a la vez ---- */
  const dets = $$('.faq details');
  dets.forEach(d=>d.addEventListener('toggle', ()=>{
    if(d.open) dets.forEach(o=>{ if(o!==d) o.open=false; });
  }));
})();
