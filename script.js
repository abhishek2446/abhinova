
document.addEventListener('DOMContentLoaded', function(){
  // Slogans (1s interval)
  const slogans = [
    "Innovation Simplified",
    "Creativity Meets Technology",
    "Your Digital Solution Partner.",
    "Design. Develop. Deliver."
  ];
  let si = 0;
  const sloganEl = document.getElementById('slogan');
  function showSlogan(){ if(!sloganEl) return; sloganEl.textContent = slogans[si]; si = (si+1) % slogans.length; }
  showSlogan();
  setInterval(showSlogan, 1000);

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  function setMode(mode){
    if(mode === 'dark'){ document.body.classList.add('dark-mode'); document.body.classList.remove('light-mode'); }
    else { document.body.classList.add('light-mode'); document.body.classList.remove('dark-mode'); }
  }
  // initialize (if no class present default to light-mode)
  if(!document.body.classList.contains('dark-mode') && !document.body.classList.contains('light-mode')){
    setMode('light');
  }
  themeToggle && themeToggle.addEventListener('click', function(){
    const dark = document.body.classList.toggle('dark-mode');
    if(dark) document.body.classList.remove('light-mode'); else document.body.classList.add('light-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  // Smooth anchor scrolling for nav links
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Contact form handler (Web3Forms feedback)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const status = document.getElementById('formStatus');
      if(status) status.textContent = 'Sending...';
      const fd = new FormData(contactForm);
      try{
        const r = await fetch(contactForm.action, { method: 'POST', body: fd });
        const j = await r.json();
        if(r.ok && j.success){ if(status) status.textContent = 'Message sent.'; contactForm.reset(); }
        else { if(status) status.textContent = j.message || 'Submission failed.'; }
      }catch(err){ if(status) status.textContent = 'Network error.'; }
    });
  }
});
