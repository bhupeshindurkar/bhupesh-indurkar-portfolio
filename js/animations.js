// Advanced Animation Controller
class AnimationController {`
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }`

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupClickAnimations();
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObservers() {
        const options = {
            threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, options);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(`
            [class*="animate-"],
            [data-animation],
            .scroll-animate,
            .stagger-animation > *
        `);

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        this.observers.set('intersection', observer);
    }

    // Trigger animations based on element and intersection ratio
    triggerAnimation(element, ratio) {
        const animationType = this.getAnimationType(element);
        const delay = this.getAnimationDelay(element);

        setTimeout(() => {
            switch (animationType) {
                case 'fade-up':
                    this.fadeUp(element);
                    break;
                case 'fade-down':
                    this.fadeDown(element);
                    break;
                case 'fade-left':
                    this.fadeLeft(element);
                    break;
                case 'fade-right':
                    this.fadeRight(element);
                    break;
                case 'slide-up':
                    this.slideUp(element);
                    break;
                case 'scale-in':
                    this.scaleIn(element);
                    break;
                case 'stagger':
                    this.staggerAnimation(element);
                    break;
                default:
                    this.defaultAnimation(element);
            }
        }, delay);
    }

    // Get animation type from element classes or data attributes
    getAnimationType(element) {
        if (element.classList.contains('animate-fade-up')) return 'fade-up';
        if (element.classList.contains('animate-fade-down')) return 'fade-down';
        if (element.classList.contains('animate-fade-left')) return 'fade-left';
        if (element.classList.contains('animate-fade-right')) return 'fade-right';
        if (element.classList.contains('animate-slide-up')) return 'slide-up';
        if (element.classList.contains('animate-scale-in')) return 'scale-in';
        if (element.parentElement?.classList.contains('stagger-animation')) return 'stagger';
        
        return element.getAttribute('data-animation') || 'fade-up';
    }

    // Get animation delay from element classes
    getAnimationDelay(element) {
        if (element.classList.contains('delay-1')) return 200;
        if (element.classList.contains('delay-2')) return 400;
        if (element.classList.contains('delay-3')) return 600;
        if (element.classList.contains('delay-4')) return 800;
        if (element.classList.contains('delay-5')) return 1000;
        
        const customDelay = element.getAttribute('data-delay');
        return customDelay ? parseInt(customDelay) : 0;
    }

    // Animation methods
    fadeUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeDown(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    slideUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    staggerAnimation(element) {
        const siblings = Array.from(element.parentElement.children);
        const index = siblings.indexOf(element);
        const delay = index * 100;

        setTimeout(() => {
            this.fadeUp(element);
        }, delay);
    }

    defaultAnimation(element) {
        this.fadeUp(element);
    }

    // Scroll-based animations
    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Parallax effect for hero background
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                const parallaxSpeed = 0.5;
                heroBackground.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            }

            // Navbar background opacity
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const opacity = Math.min(scrollY / 100, 1);
                navbar.style.background = `rgba(10, 10, 10, ${0.8 + opacity * 0.2})`;
            }

            // Progress indicator
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const progress = (scrollY / documentHeight) * 100;
                progressBar.style.width = `${progress}%`;
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        });
    }

    // Hover animations
    setupHoverAnimations() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.btn-glass, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // Glow effect on hover
        const glowElements = document.querySelectorAll('.project-card, .skill-card');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 20px 60px rgba(41, 98, 255, 0.3)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });
    }

    // Click animations
    setupClickAnimations() {
        // Ripple effect
        const rippleElements = document.querySelectorAll('.btn-glass, .project-link');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Text animation effects
    animateText(element, text, options = {}) {
        const {
            speed = 50,
            cursor = true,
            loop = false,
            delay = 0
        } = options;

        setTimeout(() => {
            let i = 0;
            element.textContent = '';
            
            if (cursor) {
                element.style.borderRight = '2px solid var(--secondary-color)';
            }

            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    
                    if (cursor) {
                        setTimeout(() => {
                            element.style.borderRight = 'none';
                        }, 1000);
                    }
                    
                    if (loop) {
                        setTimeout(() => {
                            this.animateText(element, text, options);
                        }, 2000);
                    }
                }
            }, speed);
        }, delay);
    }

    // Counter animation
    animateCounter(element, target, options = {}) {
        const {
            duration = 2000,
            easing = 'easeOutCubic',
            prefix = '',
            suffix = ''
        } = options;

        const start = 0;
        const startTime = performance.now();

        const easingFunctions = {
            linear: t => t,
            easeOutCubic: t => 1 - Math.pow(1 - t, 3),
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        };

        const easingFunction = easingFunctions[easing] || easingFunctions.linear;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFunction(progress);
            const current = Math.floor(start + (target - start) * easedProgress);

            element.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Particle system
    createParticleSystem(container, options = {}) {
        const {
            count = 50,
            color = '#2962ff',
            size = 4,
            speed = 1,
            opacity = 0.7
        } = options;

        for (let i = 0; i < count; i++) {
            this.createParticle(container, { color, size, speed, opacity });
        }
    }

    createParticle(container, options) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Set particle properties
        particle.style.position = 'absolute';
        particle.style.width = options.size + 'px';
        particle.style.height = options.size + 'px';
        particle.style.background = options.color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = options.opacity;
        particle.style.pointerEvents = 'none';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation
        const animationDuration = (Math.random() * 3 + 4) / options.speed;
        particle.style.animation = `float ${animationDuration}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        container.appendChild(particle);
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animations.clear();
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
// Trip Rider Effect Controller
class TripRiderController {
    constructor() {
        this.effects = new Map();
        this.init();
    }

    init() {
        this.setupTypewriterEffects();
        this.setupTripRiderEffects();
        this.setupWaveTextEffects();
        this.setupScrambleEffects();
    }

    // Basic Typewriter Effect
    setupTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('.typewriter-effect');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = element.getAttribute('data-speed') || 100;
            const delay = element.getAttribute('data-delay') || 0;
            
            this.typewriterEffect(element, text, speed, delay);
        });
    }

    typewriterEffect(element, text, speed = 100, delay = 0) {
        element.textContent = '';
        element.style.borderRight = '3px solid var(--secondary-color)';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    // Remove cursor after completion
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, speed);
        }, delay);
    }

    // Trip Rider (Text Rotation) Effect
    setupTripRiderEffects() {
        const tripRiderElements = document.querySelectorAll('.trip-rider-typing');
        
        tripRiderElements.forEach(element => {
            const words = element.getAttribute('data-words').split(',');
            const speed = parseInt(element.getAttribute('data-speed')) || 2000;
            
            this.tripRiderTypingEffect(element, words, speed);
        });
    }

    tripRiderTypingEffect(element, words, speed = 2000) {
        let currentWordIndex = 0;
        element.innerHTML = '';
        
        // Create word elements
        words.forEach((word, index) => {
            const wordElement = document.createElement('span');
            wordElement.className = 'trip-rider-word';
            wordElement.textContent = word.trim();
            element.appendChild(wordElement);
        });

        const wordElements = element.querySelectorAll('.trip-rider-word');
        
        const cycleWords = () => {
            // Hide all words
            wordElements.forEach(word => word.classList.remove('active'));
            
            // Show current word with typing effect
            const currentWord = wordElements[currentWordIndex];
            currentWord.classList.add('active');
            
            // Move to next word
            currentWordIndex = (currentWordIndex + 1) % words.length;
        };

        // Start the cycle
        cycleWords();
        setInterval(cycleWords, speed);
    }

    // Wave Text Effect
    setupWaveTextEffects() {
        const waveElements = document.querySelectorAll('.wave-text');
        
        waveElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            [...text].forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.animationDelay = `${index * 0.1}s`;
                element.appendChild(span);
            });
        });
    }

    // Scramble Text Effect
    setupScrambleEffects() {
        const scrambleElements = document.querySelectorAll('.scramble-text');
        
        scrambleElements.forEach(element => {
            const originalText = element.textContent;
            element.setAttribute('data-text', originalText);
            
            this.scrambleTextEffect(element, originalText);
        });
    }

    scrambleTextEffect(element, originalText) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let scrambleInterval;
        
        const startScramble = () => {
            let iterations = 0;
            
            scrambleInterval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(scrambleInterval);
                }
                
                iterations += 1 / 3;
            }, 30);
        };

        // Trigger scramble on hover
        element.addEventListener('mouseenter', startScramble);
        
        // Auto scramble every 5 seconds
        setInterval(startScramble, 5000);
    }

    // Matrix Rain Effect
    createMatrixRain(container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        
        container.style.position = 'relative';
        container.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#2962ff';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 33);
    }

    // Glitch Text Effect
    createGlitchEffect(element) {
        const originalText = element.textContent;
        element.setAttribute('data-text', originalText);
        element.classList.add('trip-rider-glitch');
        
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        const glitch = () => {
            const glitchText = originalText
                .split('')
                .map(char => Math.random() < 0.1 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
                .join('');
            
            element.textContent = glitchText;
            
            setTimeout(() => {
                element.textContent = originalText;
            }, 50);
        };
        
        // Random glitch intervals
        setInterval(() => {
            if (Math.random() < 0.1) {
                glitch();
            }
        }, 100);
    }

    // Neon Sign Effect
    createNeonEffect(element) {
        element.classList.add('neon-text');
        
        // Add flickering effect
        setInterval(() => {
            if (Math.random() < 0.03) {
                element.style.opacity = '0.5';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 50);
            }
        }, 100);
    }

    // Hologram Effect
    createHologramEffect(element) {
        element.classList.add('hologram-text');
        
        // Add scan lines
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--secondary-color);
            opacity: 0.5;
            animation: hologramScan 2s linear infinite;
        `;
        
        element.style.position = 'relative';
        element.appendChild(scanLine);
    }

    // Initialize specific effects based on data attributes
    initializeCustomEffects() {
        document.querySelectorAll('[data-trip-effect]').forEach(element => {
            const effect = element.getAttribute('data-trip-effect');
            
            switch (effect) {
                case 'matrix':
                    this.createMatrixRain(element);
                    break;
                case 'glitch':
                    this.createGlitchEffect(element);
                    break;
                case 'neon':
                    this.createNeonEffect(element);
                    break;
                case 'hologram':
                    this.createHologramEffect(element);
                    break;
                case 'scramble':
                    this.scrambleTextEffect(element, element.textContent);
                    break;
            }
        });
    }

    // Utility method to add trip rider effect to any element
    addTripRider(element, words, options = {}) {
        const {
            speed = 2000,
            typeSpeed = 100,
            effect = 'typing'
        } = options;
        
        element.setAttribute('data-words', words.join(','));
        element.setAttribute('data-speed', speed);
        element.classList.add('trip-rider-typing');
        
        this.tripRiderTypingEffect(element, words, speed);
    }
}

// Initialize Trip Rider Controller
document.addEventListener('DOMContentLoaded', () => {
    window.tripRiderController = new TripRiderController();
    
    // Initialize custom effects
    setTimeout(() => {
        window.tripRiderController.initializeCustomEffects();
    }, 1000);
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TripRiderController;
}