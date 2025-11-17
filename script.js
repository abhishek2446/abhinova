// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS if available with mobile optimizations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: window.innerWidth < 768 ? 400 : 800,
      easing: 'ease-in-out',
      once: true,
      offset: window.innerWidth < 768 ? 50 : 100,
      disable: function() {
        return window.innerWidth < 480 && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  // Mobile viewport height fix
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);

  // Navbar scroll effect (moved to mobile optimizations for better performance)

  // Mobile navigation with improved touch handling
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    // Prevent body scroll when menu is open
    const toggleMenu = () => {
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      
      // Prevent body scroll on mobile when menu is open
      if (window.innerWidth <= 768) {
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
      }
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchstart', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
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

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (formStatus) {
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
      }
      
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          if (formStatus) {
            formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            formStatus.className = 'form-status success';
          }
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (error) {
        if (formStatus) {
          formStatus.textContent = 'Failed to send message. Please try again or contact us directly.';
          formStatus.className = 'form-status error';
        }
      }
    });
  }

  // Chatbot functionality
  const chatbotWidget = document.getElementById('chatbot-widget');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');

  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWidget.classList.add('open');
    });
  }

  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbotWidget.classList.remove('open');
    });
  }

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = chatbotInput.value.trim();
      
      if (!userMessage) return;
      
      // Add user message
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'chatbot-message user';
      userMsgDiv.textContent = userMessage;
      chatbotMessages.appendChild(userMsgDiv);
      
      chatbotInput.value = '';
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      
      // Generate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(userMessage);
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'chatbot-message bot';
        botMsgDiv.textContent = botResponse;
        chatbotMessages.appendChild(botMsgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 1000);
    });
  }

  // Initialize testimonials carousel
  initTestimonialsCarousel();
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize currency switcher
  initCurrencySwitcher();
  
  // Initialize quote calculator
  initQuoteCalculator();
  
  // Initialize newsletter popup
  initNewsletterPopup();
  
  // Initialize live stats counter
  initLiveStats();
  
  // Initialize pricing buttons
  initPricingButtons();
  
  // Initialize counter animations
  initCounterAnimations();
  
  // Initialize mobile optimizations
  initMobileOptimizations();
});

// Mobile optimizations
function initMobileOptimizations() {
  // Optimize scroll performance on mobile
  let ticking = false;
  
  function updateScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      }
    }
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  // Use passive scroll listener for better performance
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Improve form interactions on mobile
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  });
  
  // Optimize chatbot for mobile
  const chatbotWidget = document.getElementById('chatbot-widget');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  
  if (chatbotWidget && chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWidget.classList.add('open');
      if (window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden';
      }
    });
    
    const chatbotClose = document.getElementById('chatbot-close');
    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotWidget.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    }
  }
  
  // Handle orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.scrollTo(0, window.scrollY);
    }, 500);
  });
}

// Testimonials Carousel with touch support
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let touchStartX = 0;
let touchEndX = 0;

function initTestimonialsCarousel() {
  if (testimonials.length === 0) return;
  
  // Auto-rotate testimonials (pause on mobile)
  if (window.innerWidth > 768) {
    setInterval(() => {
      moveCarousel(1);
    }, 5000);
  }
  
  // Add click events to carousel buttons
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => moveCarousel(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => moveCarousel(1));
  }
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index + 1));
  });

  // Add touch support for mobile
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        moveCarousel(1); // Swipe left - next
      } else {
        moveCarousel(-1); // Swipe right - previous
      }
    }
  }
}

function moveCarousel(direction) {
  if (testimonials.length === 0) return;
  
  testimonials[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].classList.remove('active');
  
  currentTestimonial += direction;
  
  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0;
  } else if (currentTestimonial < 0) {
    currentTestimonial = testimonials.length - 1;
  }
  
  testimonials[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
}

function currentSlide(n) {
  if (testimonials.length === 0) return;
  
  testimonials[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].classList.remove('active');
  
  currentTestimonial = n - 1;
  
  testimonials[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
}

// Chatbot response generator
function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
    return "We specialize in modern web development using React, Node.js, and cutting-edge technologies. Would you like to know more about our web development services?";
  }
  
  if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
    return "We create stunning mobile applications for both iOS and Android platforms. Our apps are user-friendly and built for performance. Interested in a mobile app?";
  }
  
  if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('digital')) {
    return "Our digital marketing services include SEO, social media management, and targeted advertising campaigns. Let's boost your online presence!";
  }
  
  if (lowerMessage.includes('design') || lowerMessage.includes('graphic') || lowerMessage.includes('logo')) {
    return "We offer comprehensive design services including logo design, branding, and graphic design. Our creative team can bring your vision to life!";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
    return "Our pricing depends on your specific requirements. Would you like to schedule a free consultation to discuss your project and get a custom quote?";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone')) {
    return "You can reach us at +91 7752842081 or email us at info@abhinova.com. You can also use our WhatsApp button for instant communication!";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to Abhinova. We're here to help transform your digital vision into reality. What can we assist you with today?";
  }
  
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
    return "Check out our portfolio section to see our recent projects including e-commerce platforms, mobile apps, and web applications. We've successfully delivered 100+ projects!";
  }
  
  return "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +91 7752842081 or use our WhatsApp button.";
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(savedTheme + '-mode');
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-mode');
      
      if (isDark) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Currency Switcher
function initCurrencySwitcher() {
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const amounts = document.querySelectorAll('.amount');
  const symbols = document.querySelectorAll('.currency-symbol');
  
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currency = btn.dataset.currency;
      
      // Update active button
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update prices
      amounts.forEach(amount => {
        amount.textContent = amount.dataset[currency];
      });
      
      // Update currency symbols
      const symbolMap = { usd: '$', inr: '₹', gbp: '£' };
      symbols.forEach(symbol => {
        symbol.textContent = symbolMap[currency];
      });
    });
  });
}

// Quote Calculator
function initQuoteCalculator() {
  const serviceType = document.getElementById('serviceType');
  const timeline = document.getElementById('timeline');
  const quoteAmount = document.getElementById('quoteAmount');
  
  function calculateQuote() {
    const basePrice = parseFloat(serviceType.value) || 0;
    const multiplier = parseFloat(timeline.value) || 1;
    const total = Math.round(basePrice * multiplier);
    
    if (quoteAmount) {
      quoteAmount.textContent = `$${total}`;
    }
  }
  
  if (serviceType && timeline) {
    serviceType.addEventListener('change', calculateQuote);
    timeline.addEventListener('change', calculateQuote);
  }
}

// Newsletter Popup
function initNewsletterPopup() {
  const popup = document.getElementById('newsletter-popup');
  const closeBtn = document.getElementById('popup-close');
  const form = popup?.querySelector('.newsletter-form');
  
  // Show popup after 30 seconds
  setTimeout(() => {
    if (popup && !localStorage.getItem('newsletter-shown')) {
      popup.classList.add('show');
    }
  }, 30000);
  
  // Close popup
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('show');
      localStorage.setItem('newsletter-shown', 'true');
    });
  }
  
  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing!');
      popup.classList.remove('show');
      localStorage.setItem('newsletter-shown', 'true');
    });
  }
}

// Live Stats Counter
function initLiveStats() {
  const projectsCounter = document.getElementById('projectsCompleted');
  
  if (projectsCounter) {
    let count = 5;
    setInterval(() => {
      count = Math.floor(Math.random() * 3) + 5; // Random between 5-7
      projectsCounter.textContent = count;
    }, 10000); // Update every 10 seconds
  }
}

// Pricing Buttons
function initPricingButtons() {
  const pricingBtns = document.querySelectorAll('.pricing-btn');
  
  pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      const message = `Hi! I'm interested in the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan. Can we discuss the details?`;
      const whatsappUrl = `https://wa.me/917752842081?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
}

// Counter Animation
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50; // 50 steps for smooth animation
  const duration = 2000; // 2 seconds
  const stepTime = duration / 50;
  
  element.style.animation = 'countUp 0.5s ease-out';
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// Enhanced Live Stats Counter
function initLiveStats() {
  const projectsCounter = document.getElementById('projectsCompleted');
  
  if (projectsCounter) {
    // Initial animation
    setTimeout(() => {
      animateCounter(projectsCounter, 7);
    }, 1000);
    
    // Update periodically with realistic increments
    let currentProjects = 7;
    setInterval(() => {
      const shouldIncrement = Math.random() > 0.7; // 30% chance
      if (shouldIncrement && currentProjects < 12) {
        currentProjects++;
        animateCounter(projectsCounter, currentProjects);
      }
    }, 30000); // Every 30 seconds
  }
}

// Performance optimization - preload critical resources
window.addEventListener('load', () => {
  // Preload hero video
  const heroVideo = document.querySelector('.hero-bg video');
  if (heroVideo) {
    heroVideo.preload = 'metadata';
  }
  
  // Add loaded class for animations
  document.body.classList.add('loaded');
  
  // Start counter animations after page load
  setTimeout(() => {
    initCounterAnimations();
  }, 500);
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}