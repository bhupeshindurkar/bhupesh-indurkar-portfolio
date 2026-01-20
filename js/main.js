// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounters();
    initTiltCards();
    initParticles();
    initTypingEffect();
    initSmoothScrolling();
    initThemeToggle();
    initContactForm();
    initProjectFilters();
    initButtonAnimations();
    initImageAnimations();
    initHomepageTypewriter();
});

// Initialize only homepage typewriter
function initHomepageTypewriter() {
    // Only initialize typewriter for homepage name
    const typewriterElements = document.querySelectorAll('.typewriter-effect');
    typewriterElements.forEach(element => {
        const text = element.textContent.trim();
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        // Clear the element and prepare for typing
        element.textContent = '';
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        
        setTimeout(() => {
            startSimpleTypewriter(element, text, speed);
        }, delay);
    });
}

// Simple Typewriter Effect Function
function startSimpleTypewriter(element, text, speed) {
    // Clear any existing content and styling
    element.textContent = '';
    element.style.borderRight = '2px solid var(--secondary-color)';
    element.style.animation = 'blink 1.2s infinite';
    element.style.display = 'inline-block';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Keep cursor blinking for a moment, then remove
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1500);
        }
    }, speed);
}

// Initialize Text Effects (Typewriter and Trip Rider)
function initTextEffects() {
    // Initialize TextEffects class if it exists
    if (typeof TextEffects !== 'undefined') {
        new TextEffects();
    }
    
    // Manual initialization for typewriter effects
    const typewriterElements = document.querySelectorAll('.typewriter-effect');
    typewriterElements.forEach(element => {
        const text = element.textContent.trim();
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        // Clear the element and prepare for typing
        element.textContent = '';
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        
        setTimeout(() => {
            startTypewriter(element, text, speed);
        }, delay);
    });
    
    // Manual initialization for trip rider effects
    const tripRiderElements = document.querySelectorAll('.trip-rider-typing');
    tripRiderElements.forEach(element => {
        const wordsAttr = element.getAttribute('data-words');
        if (wordsAttr) {
            const words = wordsAttr.split(',');
            const speed = parseInt(element.getAttribute('data-speed')) || 3000;
            
            startTripRider(element, words, speed);
        }
    });
}

// Typewriter Effect Function
function startTypewriter(element, text, speed) {
    // Clear any existing content and styling
    element.textContent = '';
    element.style.borderRight = '2px solid var(--secondary-color)';
    element.style.animation = 'blink 1.2s infinite';
    element.style.display = 'inline-block';
    element.style.minWidth = '2px';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Keep cursor blinking for a moment, then remove
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1500);
        }
    }, speed);
}

// Trip Rider Effect Function
function startTripRider(element, words, speed) {
    element.innerHTML = '';
    element.style.position = 'relative';
    element.style.minHeight = '1.2em';
    let currentIndex = 0;
    
    // Create word elements
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word.trim();
        wordSpan.style.position = 'absolute';
        wordSpan.style.left = '0';
        wordSpan.style.top = '0';
        wordSpan.style.opacity = index === 0 ? '1' : '0';
        wordSpan.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        wordSpan.style.transform = index === 0 ? 'translateY(0)' : 'translateY(10px)';
        element.appendChild(wordSpan);
    });
    
    // Start cycling after a delay
    setTimeout(() => {
        setInterval(() => {
            const currentWord = element.children[currentIndex];
            const nextIndex = (currentIndex + 1) % words.length;
            const nextWord = element.children[nextIndex];
            
            // Fade out current word
            currentWord.style.opacity = '0';
            currentWord.style.transform = 'translateY(-10px)';
            
            // Fade in next word
            setTimeout(() => {
                nextWord.style.opacity = '1';
                nextWord.style.transform = 'translateY(0)';
            }, 400);
            
            currentIndex = nextIndex;
        }, speed);
    }, 1500); // Start trip rider after "About Me" finishes typing
}

// Simple Image Animations - Removed
function initImageAnimations() {
    // No image animations - keeping images simple and clean
    console.log('Image animations disabled for better user experience');
}

// Button Click Animations
function initButtonAnimations() {
    // Add ripple effect to all buttons and nav links
    const buttons = document.querySelectorAll('.btn-glass, .nav-link, .project-link, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add bounce effect on click
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add special animation for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active pulse animation
            this.classList.add('nav-clicked');
            setTimeout(() => {
                this.classList.remove('nav-clicked');
            }, 300);
        });
    });
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-slide-up, .animate-scale-in, .scroll-animate'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Tilt effect for cards
function initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Particle system
function initParticles() {
    const particleContainer = document.querySelector('.hero-background');
    if (!particleContainer) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and properties
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(particle);
}

// Typing effect
function initTypingEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme toggle (if implemented)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateForm(data)) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

function validateForm(data) {
    return data.name && data.email && data.message && isValidEmail(data.email);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.classList.add('animate-scale-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-scale-in');
                }
            });
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard.', 'error');
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor scroll performance
    let scrolling = false;
    window.addEventListener('scroll', () => {
        if (!scrolling) {
            requestAnimationFrame(() => {
                // Scroll-based animations here
                scrolling = false;
            });
            scrolling = true;
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Export functions for use in other files
window.portfolioUtils = {
    copyToClipboard,
    showNotification,
    debounce,
    throttle
};

// Additional functionality for specific pages

// Initialize skill progress bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress, .skill-progress-small');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced contact form with validation
function initEnhancedContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('.glass-input');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin btn-icon';
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane btn-icon';
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Remove focused class from all form groups
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        }, 2000);
    });
}

// Enhanced project filtering
function initEnhancedProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button with animation
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';
            
            // Filter projects with stagger animation
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                setTimeout(() => {
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });
}

// Copy to clipboard with enhanced feedback
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Email copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Email copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy email. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notification-container') || document.body;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon fas ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Trigger show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page-specific features
    initSkillBars();
    initFAQ();
    initEnhancedContactForm();
    initEnhancedProjectFilters();
    
    // Add smooth reveal animations for elements
    const revealElements = document.querySelectorAll('.glass-card, .glass-panel');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
});

// Export enhanced utilities
window.portfolioUtils = {
    ...window.portfolioUtils,
    copyToClipboard,
    showNotification,
    initSkillBars,
    initFAQ,
    initEnhancedContactForm,
    initEnhancedProjectFilters
};

// Mobile Navigation Functionality
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Create hamburger if it doesn't exist
    if (!hamburger) {
        const navContainer = document.querySelector('.nav-container');
        const hamburgerElement = document.createElement('div');
        hamburgerElement.className = 'hamburger';
        hamburgerElement.innerHTML = '<span></span><span></span><span></span>';
        navContainer.appendChild(hamburgerElement);
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        const hamburgerBtn = document.querySelector('.hamburger');
        const menu = document.querySelector('.nav-menu');
        
        if (hamburgerBtn && menu) {
            hamburgerBtn.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('menu-open');
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        const hamburgerBtn = document.querySelector('.hamburger');
        const menu = document.querySelector('.nav-menu');
        
        if (hamburgerBtn && menu) {
            hamburgerBtn.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    // Event listeners
    document.addEventListener('click', function(e) {
        if (e.target.closest('.hamburger')) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Prevent body scroll when menu is open
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Mobile Touch Optimizations
function initMobileTouchOptimizations() {
    // Add touch class to body for touch-specific styles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    // Improve touch scrolling
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 100);
    });

    // Optimize button touches
    const buttons = document.querySelectorAll('.btn-glass, .project-link, .social-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });

        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
}

// Mobile Performance Optimizations
function initMobilePerformanceOptimizations() {
    // Lazy load images on mobile
    if (window.innerWidth <= 768) {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==';
            }
            imageObserver.observe(img);
        });
    }

    // Reduce animations on mobile for better performance
    if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                
                .animate-slide-up,
                .animate-fade-up,
                .animate-scale-in {
                    animation-duration: 0.5s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize mobile-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initMobileTouchOptimizations();
    initMobilePerformanceOptimizations();
});

// Mobile viewport height fix
function setMobileViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setMobileViewportHeight);
window.addEventListener('orientationchange', setMobileViewportHeight);
setMobileViewportHeight();