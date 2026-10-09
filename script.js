const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

// Mobile navigation
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

$$('.nav-link').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

// Header + reading progress
const header = $('#siteHeader');
const progress = $('#progressBar');
function scrollUI(){
  header?.classList.toggle('scrolled', window.scrollY > 15);
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if(progress) progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
}
window.addEventListener('scroll', scrollUI, {passive:true});
scrollUI();

// Reveal animations
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold: reduceMotion ? 0 : .12});
$$('.reveal').forEach(el => observer.observe(el));

// Active section in navbar
const sections = $$('main section[id]');
const navLinks = $$('.nav-link');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => sectionObserver.observe(s));

// Animated stats
const counters = $$('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1000;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now-start)/duration,1);
      const eased = 1 - Math.pow(1-p,3);
      el.textContent = Math.round(target*eased) + (target === 100 ? '%' : target === 360 ? '°' : '+');
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(c => counterObserver.observe(c));

// Project filter
$$('.filter').forEach(button => button.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  $$('.project-card').forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !show);
  });
}));

// Service modal content
const serviceData = {
  planning:{title:'Urban Planning & Development',text:'A coordinated planning service for residential, mixed-use, institutional and development projects — from early concept through planning documentation.',list:['Site and context analysis','Land-use and development structure','Road and circulation framework','Plot / block planning concepts','Planning drawings and presentation material']},
  landscape:{title:'Urban Landscape Design',text:'Landscape and public-realm thinking integrated with the way people move, gather and experience a place.',list:['Landscape concept and zoning','Open-space hierarchy','Pedestrian and public-realm strategy','Planting / softscape framework','Hardscape and site-element coordination']},
  report:{title:'Planning Report & Feasibility',text:'Clear, evidence-led reports that help clients understand development potential, constraints and planning implications.',list:['Site assessment and context','Policy / regulatory review','Development feasibility framework','Maps, diagrams and supporting analysis','Professional planning report']},
  tia:{title:'Traffic Impact Analysis',text:'Structured traffic analysis for proposed developments, focused on access, network effects and practical mitigation.',list:['Trip generation assessment','Traffic distribution / assignment','Junction and road analysis','Access and circulation review','Mitigation and improvement recommendations']},
  video:{title:'Traffic Video Survey',text:'Field-based video observation designed to produce traceable, reviewable traffic information.',list:['Video survey planning','Classified movement observation','Peak-hour extraction','Turning movement review','Digital documentation and summary tables']},
  count:{title:'Professional Traffic Count',text:'Field traffic counts prepared for planning, transport studies and development impact assessments.',list:['Classified vehicle counts','Turning movement counts','Hourly / peak-period counts','Direction-wise movement data','Clean Excel-ready survey tables']},
  survey:{title:'Topographic Surveying',text:'Site survey information structured for planning, engineering coordination and CAD/GIS workflows.',list:['Spot levels and contours','Existing physical features','Road / drain / structure mapping','Boundary and site reference information','CAD-ready survey base']},
  gis:{title:'GIS & Remote Sensing',text:'Spatial data services that turn disparate site and geographic information into usable planning intelligence.',list:['GIS database / geodatabase setup','Spatial analysis and overlay','Satellite / remote-sensing interpretation','Land-use and land-cover analysis','GIS deliverables for planning decisions']},
  mapping:{title:'Thematic Mapping',text:'Professional cartography for reports, presentations and decision-making — with a consistent visual language.',list:['Land-use and zoning maps','Accessibility / network maps','Demographic and statistical maps','Environmental / risk mapping','Publication-ready map layouts']},
  custom:{title:'Custom Spatial Solutions',text:'A tailored combination of planning, mobility, survey and GIS services around your exact project brief.',list:['Define the problem','Select the right data and fieldwork','Build an integrated analysis workflow','Deliver client-ready outputs','Support revisions and presentation']}
};
const modal = $('#serviceModal'), modalTitle = $('#modalTitle'), modalText = $('#modalText'), modalList = $('#modalList');
$$('.service-more').forEach(btn => btn.addEventListener('click', () => {
  const key = btn.closest('.service-card').dataset.service;
  const d = serviceData[key];
  if(!d || !modal) return;
  modalTitle.textContent = d.title; modalText.textContent = d.text; modalList.innerHTML = d.list.map(x => `<li>${x}</li>`).join('');
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}));
$$('[data-close-modal]').forEach(el => el.addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) modal.querySelector('[data-close-modal]').click(); });

// Current year
$('#year').textContent = new Date().getFullYear();
