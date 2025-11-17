// ABHINOVA Ultimate Homepage JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(13, 13, 13, 0.95)';
      navbar.style.borderBottom = '1px solid rgba(78, 184, 255, 0.2)';
    } else {
      navbar.style.background = 'rgba(13, 13, 13, 0.8)';
      navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }, { passive: true });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add fade-in animation to elements
  document.querySelectorAll('.service-card, .highlight-card, .portfolio-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
    observer.observe(element);
  });

  // Enhanced card hover effects
  document.querySelectorAll('.service-card, .highlight-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // Floating particles
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(78, 184, 255, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.zIndex = '1';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
      {
        transform: 'translateY(0) rotate(0deg)',
        opacity: 1
      },
      {
        transform: `translateY(-100vh) rotate(360deg)`,
        opacity: 0
      }
    ], {
      duration: 8000 + Math.random() * 4000,
      easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
  }

  setInterval(createParticle, 2000);

  // Button interactions
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Page load animations
  window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.8s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  });
});