// Main JavaScript - All Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-up elements
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
    
    // Card hover effects
    const cards = document.querySelectorAll('.preview-card, .service-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.classList.contains('glow-btn')) {
                this.style.boxShadow = '0 0 40px rgba(14, 165, 233, 0.6)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.classList.contains('glow-btn')) {
                this.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.4)';
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formStatus = document.getElementById('formStatus');
            
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formStatus.innerHTML = '<p style="color: #10b981;">Message sent successfully! We\'ll get back to you soon.</p>';
                    this.reset();
                } else {
                    formStatus.innerHTML = '<p style="color: #ef4444;">Something went wrong. Please try again.</p>';
                }
            })
            .catch(error => {
                formStatus.innerHTML = '<p style="color: #ef4444;">Something went wrong. Please try again.</p>';
            });
        });
    }
    
    // Pricing calculator functionality
    const serviceType = document.getElementById('serviceType');
    const timeline = document.getElementById('timeline');
    const quoteAmount = document.getElementById('quoteAmount');
    
    function calculateQuote() {
        if (serviceType && timeline && quoteAmount) {
            const basePrice = parseInt(serviceType.value) || 0;
            const multiplier = parseFloat(timeline.value) || 1;
            const total = Math.round(basePrice * multiplier);
            quoteAmount.textContent = `$${total}`;
        }
    }
    
    if (serviceType && timeline) {
        serviceType.addEventListener('change', calculateQuote);
        timeline.addEventListener('change', calculateQuote);
    }
    
    // Currency switcher functionality
    const currencyBtns = document.querySelectorAll('.currency-btn');
    const amounts = document.querySelectorAll('.amount');
    const currencySymbols = document.querySelectorAll('.currency-symbol');
    
    currencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            currencyBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const currency = this.dataset.currency;
            const symbols = {
                'usd': '$',
                'inr': '₹',
                'gbp': '£'
            };
            
            // Update currency symbols
            currencySymbols.forEach(symbol => {
                symbol.textContent = symbols[currency] || '$';
            });
            
            // Update amounts
            amounts.forEach(amount => {
                const newAmount = amount.dataset[currency];
                if (newAmount) {
                    amount.textContent = newAmount;
                }
            });
        });
    });
    
    // Initialize animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Set initial body opacity for smooth loading
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';