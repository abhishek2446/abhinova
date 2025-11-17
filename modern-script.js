// Modern Premium ABHINOVA Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile viewport height fix
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', setVH);

  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Smooth scrolling for navigation links
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

  // Enhanced navbar scroll effect
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (navbar) {
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(79, 195, 247, 0.2)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Counter Animation
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Counter animation
        if (element.classList.contains('counter')) {
          const target = parseInt(element.getAttribute('data-target'));
          animateCounter(element, target);
          observer.unobserve(element);
        }
        
        // Fade in animation
        if (element.classList.contains('animate-on-scroll')) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
  });

  // Add scroll animations to sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-on-scroll');
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
  });

  // Enhanced card hover effects
  document.querySelectorAll('.service-card, .portfolio-item, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });

  // Particle effect for hero section (lightweight)
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(79, 195, 247, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = 'float 8s linear infinite';
    
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 8000);
    }
  }

  // Add CSS for particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Create particles periodically
  setInterval(createParticle, 2000);

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 2000);
      }, 1000);
    });
  }

  // Theme toggle (if needed)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });
  }

  // Pricing currency switcher
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const amounts = document.querySelectorAll('.amount');
  const symbols = document.querySelectorAll('.currency-symbol');
  
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currency = btn.dataset.currency;
      
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      amounts.forEach(amount => {
        if (amount.dataset[currency]) {
          amount.textContent = amount.dataset[currency];
        }
      });
      
      const symbolMap = { usd: '$', inr: '₹', gbp: '£' };
      symbols.forEach(symbol => {
        symbol.textContent = symbolMap[currency] || '$';
      });
    });
  });

  // Enhanced loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-text > *, .hero-stats .stat');
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

  // Chatbot toggle
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWidget = document.getElementById('chatbot-widget');
  
  if (chatbotToggle && chatbotWidget) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWidget.classList.toggle('open');
    });
  }

  // Performance optimization: Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});